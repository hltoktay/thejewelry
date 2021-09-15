import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { getData , postData } from '../utils/fetchData';

import { useRouter } from 'next/router'

const Cart = () => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth, orders } = state;

  const [ total, setTotal ] = useState(0)

  const [ address, setAddress ] = useState('')
  const [ mobile, setMobile ] = useState('')
  const [ city, setCity ] = useState('')
  const [ postcode, setPostcode ] = useState('')

  const [ callback, setCallback] = useState(false)
  const router = useRouter()

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
          const { _id, title, images, price, inStock, sold, ref } = res.product
          if(inStock > 0 ) {
            newArr.push({ 
              _id, title, images, price, inStock, sold, ref,
              quantity: item.quantity > inStock ? 1 : item.quantity
               })
          }
        }

        dispatch({ type: 'ADD_CART', payload: newArr })
      }

      updateCart()
    }
  }, [callback])

  const handlePayment = async () => {
    if(!address || !mobile)
    return dispatch({ type: 'NOTIFY', payload: { error: 'Please add your details.'}})

    let newCart = [];
    for(const item of cart){
       const res = await getData(`product/${item._id}`)
       if(res.product.inStock - item.quantity >= 0 ){
         newCart.push(item)
       }
    }

    if (newCart.length < cart.length) {
      setCallback(!callback)
      return dispatch({
        type: 'NOTIFY', payload: {
        error: 'The product is out of stock or the quantity is insufficient.'
        }
      })
    }

    dispatch({ type: 'NOTIFY', payload: { loading: true }})

    postData('order', { address, mobile, city, postcode, cart, total } , auth.token)
        .then(res => {
          if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err }})

          dispatch({ type: 'ADD_CART', payload: [] })

          const newOrder = {
            ...res.newOrder,
            user: auth.user
          }
          dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
          dispatch({ type: 'NOTIFY', payload: {success: res.msg }})
          return router.push(`/order/${res.newOrder._id}`)
        })


  }

  
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
            className="form-control mb-2" 
            value={address}
            onChange={e => setAddress(e.target.value) } />

          <div className="row">
            <div class="col-md-4">
              <label htmlFor="city" class="form-label">City</label>
              <input type="text" class="form-control" name="city" id="city"
            value={city}
            onChange={e => setCity(e.target.value) } />

            </div>
            <div class="col-md-4">
              <label htmlFor="postcode" class="form-label">Postcode</label>
              <input type="text" class="form-control" name="postcode" id="postcode"
            value={postcode}
            onChange={e => setPostcode(e.target.value) }
               />
            </div>
          </div>

          <label htmlFor="mobile">Mobile</label>
          <input type="text" name="mobile" id="mobile" className="form-control mb-2"
          value={mobile}
          onChange={e => setMobile(e.target.value) }
           />
        </form>

        <h3>Total: <span>£ {total}</span></h3>

        <p style={{fontSize: '10px'}}>Total amount can only be estimated due to variations in product weight, metal fix & currency fluctuations</p>

       
        <Link href={auth.user ? '#' : '/login'}>
          <a style={{ backgroundColor: 'white', border: '2px solid', fontSize: '12px' }} onClick={handlePayment} className="btn my-2">Process with payment</a>
        </Link>


        <Link href={auth.user ? '#' : '/'}>
          <a style={{ backgroundColor: "#e6d9bf", border: '2px solid #584828', fontSize: '12px', marginLeft: '8px' }} className="btn my-2">Continue Shopping</a>
        </Link>

       
       
    </div>
    
    </div>
  )
}

export default Cart;


          // payment
          //   ? <PaypalBtn
          //   total={total}
          //   address={address}
          //   mobile={mobile}
          //   city={city}
          //   postcode={postcode}
          //   state={state}
          //   dispatch={dispatch}
          //    />