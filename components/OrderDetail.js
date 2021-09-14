import Link from 'next/link';
import PaypalBtn from './paypalBtn';
import {patchData} from '../utils/fetchData'
import {updateItem} from '../store/Actions'

const OrderDetail = ({orderDetail, state, dispatch}) => {
      const {auth, orders} = state

      const handleDelivered = (order) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})

        patchData(`order/delivered/${order._id}`, null, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            const { paid, dateOfPayment, method, delivered } = res.result

            dispatch(updateItem(orders, order._id, {
                ...order, paid, dateOfPayment, method, delivered
            }, 'ADD_ORDERS'))

            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    if(!auth.user) return null;
    return (
        <>
            {orderDetail.map(order => (
                <>
                <div className="d-inline"  key={order._id} style={{margin: "20px auto"}}>
                    <div className="text-uppercase my-3">
                        <h2 className="text-break">Order {order._id}</h2>
                        <div className="mt-4 text-secondary">
                            <h4>Shipping</h4>
                            <p>Name : {order.user.name}</p>
                            <p>Email : {order.user.email}</p>
                            <p>Address : {order.user.address},{order.user.city}, {order.user.postcode}</p>
                            <p>Mobile: {order.user.mobile}</p>

                          <div style={{maxWidth: '400px'}} className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                            {
                                order.delivered ? `Dispatch on ${order.updatedAt}` : 'Not Delivered'
                            }
                            {
                                auth.user.role === 'admin' && !order.delivered &&
                                <button className="btn btn-dark text-uppercase"
                                onClick={() => handleDelivered(order)}>
                                    Mark as dispatch
                                </button>
                            }
                            
                        </div>

                            <h5>Payment Status</h5>
                        {
                            order.method && <h6>Method: <em>{order.method}</em></h6>
                        }
                        
                        {
                            order.paymentId && <p>PaymentId: <em>{order.paymentId}</em></p>
                        }
                        
                        <div style={{maxWidth: '400px'}} className={`alert ${order.paid ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                            {
                                order.paid ? `Paid on ${order.dateOfPayment}` : 'Not Paid'
                            }
                            
                        </div>

                            <div style={{maxWidth: '600px'}}>
                                <h5>Order Items</h5>
                                {order.cart.map(item => (
                                    <div className="list-group">
                                        <a
                                            href={`/product/${item._id}`}
                                            className="list-group-item list-group-item-action d-flex gap-3 py-3"
                                            aria-current="true"
                                        >
                                            <img
                                                src={item.images[0].url}
                                                alt={item.images[0].url}
                                                width="32"
                                                height="32"
                                                className="rounded-circle flex-shrink-0"
                                            />
                                            <div className="d-flex gap-2 w-100 justify-content-between">
                                                <div>
                                                    <h6 className="mb-0">{item.ref}</h6>
                                                    <p className="mb-0 opacity-75">{item.title}</p>
                                                </div>
                                                <small className="opacity-50 text-nowrap">
                                                    {item.quantity} x £{item.price} = £{item.price * item.quantity}
                                                </small>
                                            </div>
                                        </a>
                                    </div>
                  
                                ))}
                                 
                            </div>
                            
                        </div>
                           
                    </div>
                   
                </div>
                <div className="d-inline">
                {
                     !order.paid && auth.user.role !== 'admin' && 
                        <div className="d-inline">
                            <h2 className="mb-4 text-uppercase">Total: £{order.total}</h2>
                            <PaypalBtn order={order} />
                        </div>
                }
                </div>
            </>
            ))}
            
        </>
    );
};

export default OrderDetail;
