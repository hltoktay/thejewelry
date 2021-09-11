import { useEffect, useRef, useContext } from 'react'
import { patchData, postData } from '../utils/fetchData'
import {DataContext} from '../store/GlobalState'
import {updateItem} from '../store/Actions'

const paypalBtn = ({ total, address, mobile, city, postcode, state, dispatch }) => {
  const refPaypalBtn = useRef()
  const { cart, auth, orders } = state;

  useEffect(() => {
    paypal.Buttons({

        // Sets up the transaction when a payment button is clicked
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: total
              }
            }]
          });
        },

        // Finalize the transaction after payer approval
        onApprove: function(data, actions) {

          dispatch({ type: 'NOTIFY', payload: {loading: true }})

          return actions.order.capture().then(function(details) {

              postData('order', { address, mobile, city, postcode, cart, total } , auth.token)
              .then(res => {
                if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err }})

                dispatch({ type: 'ADD_CART', payload: [] })

                const newOrder = {
                  ...res.newOrder,
                  user: auth.user
                }
                dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
                return dispatch({ type: 'NOTIFY', payload: {success: res.msg }})
              })

          });
        }
      }).render(refPaypalBtn.current);
  },[])

  return (
    <div ref={refPaypalBtn}>

    </div>
  )
}

export default paypalBtn