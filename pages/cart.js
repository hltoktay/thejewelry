import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { getData } from '../utils/fetchData';

const Cart = () => {
  const [ state, dispatch ] = useContext(DataContext)
  const { cart, auth } = state;

  const [ total, setTotal ] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      },0 )
      setTotal(res)
    }

    getTotal()
  }, [cart])

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__jews'))
    if(cartLocal && cartLocal.length > 0) {
      let newArr = []
      const updateCart = async () => {
        for (const item of cartLocal){ 
          const res = await getData(`product/${item._id}`)
          const { _id, title, images, price, inStock, ref } = res.product
          if(inStock > 0 ) {
            newArr.push({ 
              _id, title, images, price, inStock, ref,
              quantity: item.quantity > inStock ? 1 : item.quantity
               })
          }
        }

        dispatch({ type: 'ADD_CART', payload: newArr })
      }

      updateCart()
    }
  }, [])

  
  if( cart.length === 0 ) return <div>
   
    <img width="320px" className="img-fluid mx-5" src="/empty_cart.png" />
     <h2 className="d-inline mx-5">Cart is empty!</h2>
    </div>

  return (
    <div style={{backgroundColor: '#ebeae8'}} className="container row mx-auto">
      <Head>
        <title>Cart Page</title>
      </Head>

    <div className="col-md-8  mt-5">
        <h2 className="text-uppercase">Shopping Cart</h2>  


        <table className="table">
           <thead>
              <tr>
                <th className="col-4">Ref</th>
                <th className="col-2">Quantity</th>
                <th className="col-2">Net Unit Price</th>
                <th className="col-1">Total</th>
                <th className="col-1">Remove</th>
              </tr>
            </thead>

          <tbody>
            {
              cart.map(item => (
                <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
              ))
            }
          </tbody>
        </table>
    </div>




    <div className="col-md-4 text-right text-uppercase mt-5">
        <form>
          <h2>Shipping</h2>
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address"
            className="form-control mb-2" />

          <div className="row">
            <div class="col-md-4">
              <label htmlFor="city" class="form-label">City</label>
              <input type="text" class="form-control" name="city" id="city" />

            </div>
            <div class="col-md-4">
              <label htmlFor="postcode" class="form-label">Postcode</label>
              <input type="text" class="form-control" name="postcode" id="postcode" />
            </div>
          </div>

          <label htmlFor="mobile">Mobile</label>
          <input type="text" name="mobile" id="mobile"
            className="form-control mb-2" />
        </form>

        <h3>Total: <span>£ {total}</span></h3>

        <p style={{fontSize: '10px'}}>Total amount can only be estimated due to variations in product weight, metal fix & currency fluctuations</p>

        <Link  href={auth.user ? '#' : '/'}>
          <a style={{backgroundColor: "white", border: '2px solid #584828', fontSize: '12px'}} className="btn my-2">Continue Shopping</a>
        </Link>

        <Link href={auth.user ? '#' : '/login' }>
          <a style={{backgroundColor:'#e6d9bf', border: '2px solid', fontSize: '12px', marginLeft: '5px'}} className="btn my-2">Process with payment</a>
        </Link>

       
    </div>
    
    </div>
  )
}

export default Cart;