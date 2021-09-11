 import Head from 'next/head';
 import { useState, useContext, useEffect } from 'react';
 import { DataContext } from '../../store/GlobalState';
 import { useRouter } from 'next//router';
 import Link from 'next/link';


 
 const DetailOrder = () => {
     const [ state, dispatch ] = useContext(DataContext)
     const { orders, auth } = state

     const router = useRouter()
     

     const [orderDetail, setOrderDetail ] = useState([])

     useEffect(() => {
         const newArr = orders.filter(order => order._id === router.query.id)
         setOrderDetail(newArr)
     }, [orders])

     return (
<div className="container my-3" style={{height: '100vh'}}>
    <Head>
        <title>Detail Orders</title>
    </Head>
    <div>
        <button className="btn btn-dark" onClick={() => router.back()}>
            <i className="fas fa-long-arrow-alt-left mx-2" aria-hidde="true"></i>Go Back
                </button>
    </div>
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
        {
            orderDetail.map(order => (
            <div key={order._id} className="text-uppercase my-3">
                <h2 className="text-break">Order {order._id}</h2>
                <div className="mt-4 text-secondary">
                    <h4>Shipping</h4>
                    <p>Name : {order.user.name}</p>
                    <p>Email : {order.user.email}</p>
                    <p>Address : {order.user.address}</p>
                    <p>Mobile : {order.user.mobile}</p>

                    <div className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'} 
                            d-flex justify-content-between align-items-center`} role="alert">
                        {
                            order.delivered ? `Delivered on ${order.updateAt}` : 'Not Delivered'
                        }
                    </div>

                    <div>
                        <h4>Order Items</h4>
                    {
                        order.cart.map(item => (
                            <div class="list-group">
                                <a href={`/product/${item._id}`} class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                    <img src={item.images[0].url} alt={item.images[0].url} width="32" height="32" class="rounded-circle flex-shrink-0"/>
                                        <div class="d-flex gap-2 w-100 justify-content-between">
                                            <div>
                                                <h6 class="mb-0">{item.ref}</h6>
                                                <p class="mb-0 opacity-75">{item.title}</p>
                                            </div>
                                            <small class="opacity-50 text-nowrap">{item.quantity} x £{item.price} = £{item.price * item.quantity}</small>
                                        </div>
                                </a>
                            </div>


                            // <div
                            //     className="row border-bottom mx-0 p-2 justify-content-between align-middle align-items-center d-inline"
                            //     key={item._id}
                            //     style={{ maxWidth: '500px' }}>
                            //     <img style={{ width: '80px', height: '50px', objectFit: 'cover' }}
                            //         src={item.images[0].url} alt={item.images[0].url} />

                            //     <h6 className="flex-fill text-secondary px-3 mt-2 d-inline">
                            //         <Link href={`/product/${item._id}`}>
                            //             <a>{item.ref}</a>
                            //         </Link>
                            //     </h6>

                            //     <p className="d-inline px-5">
                            //         {item.title}
                            //     </p>

                            //     <span className="text-info m-0 px-5">
                            //         {item.quantity} x £{item.price} = £{item.price * item.quantity}
                            //     </span>

                            // </div>
                        ))
                    }
                    </div>

                </div>

            </div>

            ))
        }
    </div>
</div>
     )
 }

 export default DetailOrder;