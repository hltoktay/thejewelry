import Link from 'next/link';
import { useContext } from 'react';
import { DataContext } from '../../store/GlobalState';
import { addToCart } from '../../store/Actions';

const ProductItem = ({ product,  handleCheck }) => {

    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state;


    const userLink = () =>{
        return (
          <>
            <div className="justify-content-center d-inline p-2">
              <Link href={`product/${product._id}`}>
                <a style={{ flex: 1 }} className="btn btn-light px-5">
                  View
                </a>
              </Link>
              <button
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#e6d9bf",
                  flex: 1
                }}
                disabled={product.inStock === 0 ? true : false}
                className="btn px-5"
                onClick={() => dispatch(addToCart(product, cart))}
              >
                <i className="fas fa-cart-plus"></i>
                Buy
              </button>
            </div>
          </>
        );
    }

     const adminLink = () =>{
        return (
          <>
            <div className="justify-content-center d-inline p-2">
              <Link href={`create/${product._id}`}>
                <a style={{ flex: 1, backgroundColor: "#e6d9bf", }} className="btn btn-light px-5">
                  Edit
                </a>
              </Link>
              <button
                style={{
                  marginLeft: "5px",
                  flex: 1
                }}
                className="btn btn-danger px-5"
                data-bs-toggle="modal" data-bs-target="#exampleModal" 
                onClick={() => dispatch({
                    type: 'ADD_MODAL',
                    payload: [{ 
                        data: '', id: product._id, 
                        title: product.title, type: 'DELETE_PRODUCT' 
                    }]
                })}
              >
                Delete
              </button>
            </div>
          </>
        );
    }


    return (
        <div  className="container">
         {
                auth.user && auth.user.role === 'admin' &&
                <input type="checkbox" checked={product.checked}
                  className="position-absolute"
                  style={{ height: '20px', width: '20px' }}
                  onChange={() => handleCheck(product._id)} />
              }


            <div  className="row row-cols-2 row-cols-md-3 g-5">
                <div className="col">
                    <div style={{width: '320px', height: 'auto'}} className="card mb-3">
             
                        <img src={product.images[0].url} className="card-img-top" alt="..." />
                        <div className="card-body text-center">
                            <h6 className="card-title d-inline p-2" title={product.ref}> {product.ref} </h6>
                            |
                             <h6 className="d-inline p-2">£{product.price}</h6>
                             
                            <div className="row">
                                {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()}
                            </div>
                               
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default ProductItem;