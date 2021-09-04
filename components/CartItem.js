import Link from 'next/link';

import { decrease, increase } from '../store/Actions'

const CartItem = ({item, dispatch, cart}) => {
    return (
   
    <tr>
        <th scope="row">
            <img style={{ minWidth: '120px', height: '40px' }} src={item.images[0].url} alt={item.images[0].url} />
            <p className="d-inline p-3">{item.ref}</p> 
        </th>
        

        <td>
         <button style={{ backgroundColor: '#e6d9bf' }} className="btn btn-outline-secondary"
         onClick={() => dispatch(decrease(cart, item._id)) }
         disabled={item.quantity === 1 ? true : false}
         > - </button>

      
        <span className="px-3">{item.quantity}</span>

        <button style={{ backgroundColor: '#e6d9bf' }} className="btn btn-outline-secondary"
        onClick={() => dispatch(increase(cart, item._id)) } 
        disabled={item.quantity === item.inStock ? true : false}
        > + </button>

        </td>
        <td>{item.price}</td>
        <td>£ {item.quantity * item.price}</td>
        <td style={{ minWidth: '50px', cursor: 'pointer', color: 'red' }}>
            <i class="fas fa-trash-alt" aria-hidden="true"
            data-bs-toggle="modal" data-bs-target="#exampleModal"
            onClick={() => dispatch({
                type: 'ADD_MODAL',
                payload: { data: cart, id: item._id, title: item.title }
            })}
            >
            </i>
        </td>

    </tr>
  
    );
}

export default CartItem;