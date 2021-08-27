import Link from 'next/link';

const ProductItem = ({ product }) => {

    const userLink = () =>{
        return(
            <>
                <div  className="justify-content-center d-inline p-2">
                    <Link   href={`product/${product._id}`}>
                        <a style={{flex: 1}} className="btn btn-light px-5">View</a>
                    </Link>
                    <button style={{marginLeft: '5px', backgroundColor: '#e6d9bf', flex: 1}} className="btn px-5">
                        <i class="fas fa-cart-plus"></i> Buy
                 </button>
                </div>
            </>
        )
    }

    // console.log(product)

    return (
        <div  className="container">


            <div  className="row row-cols-2 row-cols-md-3 g-5">
                <div className="col">
                    <div style={{width: '320px', height: 'auto'}} className="card mb-3">
                        <img src={product.images[0].url} className="card-img-top" alt="..." />
                        <div className="card-body text-center">
                            <h6 className="card-title d-inline p-2" title={product.ref}> {product.ref} </h6>
                            |
                             <h6 className="d-inline p-2">£{product.price}</h6>
                             
                            <div className="row">
                                {userLink()}
                            </div>
                               
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default ProductItem;