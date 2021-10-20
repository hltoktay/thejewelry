import Head from 'next/head';
import { useState, useContext } from 'react';
import { getData } from '../../utils/fetchData';
import { DataContext } from '../../store/GlobalState';
import { addToCart } from '../../store/Actions';

const DetailProduct = (props) => {
    const [ product ] = useState(props.product)

    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;


    const isActive = (index) => {
        if(tab ===index) return " active";
        return ""
    }


    return (
      <div className="row mx-5 detail_page">
        <Head>
          <title>Detail Products</title>
        </Head>

        <div className="col-md-7 mt-5">
          <h2 className="text-uppercase">{product.ref}</h2>
          <h6 className="text-uppercase">{product.title}</h6>

          <table class="table mt-3">
            <thead style={{ backgroundColor: "#e6d9bf" }}>
              <tr>
                <th scope="col">Ref</th>
                <th scope="col">Wgt</th>
                <th scope="col">Ppg</th>
                <th scope="col">Price</th>
                <th scope="col">In Stock</th>
                <th scope="col">Sold</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{product.ref}</th>
                <td>{product.wgt} gr</td>
                <td>£{product.ppg}</td>
                <td>£{product.price}</td>
                <td>
                  {product.inStock > 0 ? (
                    <h6 className="d-inline text-danger">{product.inStock}</h6>
                  ) : (
                    <h6 className="d-inline text-danger">Out Stock</h6>
                  )}
                </td>
                <td className="text-danger">{product.sold}</td>
              </tr>
            </tbody>
          </table>
            <button type="button" className="btn btn-dark d-block my-3 px-5"
            onClick={() => dispatch(addToCart(product, cart)) }
            >
                ADD TO CART
            </button>
        </div>

        <div className="col-md-5">
          <img
            style={{ height: "400px", width: 'auto',  objectFit: 'cover' }}
            className="d-block img-thumbnail rounded mt-4 w-100"
            src={product.images[tab].url}
            alt={product.images[0].url}
          />
          <div className="row mx-0" style={{ cursor: "pointer" }}>
            {product.images.map((img, index) => (
              <img
                style={{ height: "80px", width: "20%" }}
                className={`img-thumbnail rounded ${isActive(index)}`}
                key={index}
                src={img.url}
                alt={img.url}
                onClick={() => setTab(index)}
              />
            ))}
          </div>
        </div>

       
      </div>
    );
}

export async function getServerSideProps({params: {id}}) {
  const res = await getData(`product/${id}`)
  // console.log(res)
  // server side rendering

  return {
      props: {
          product: res.product
      },
     // will be passed to the page component as props
  }
}


export default DetailProduct;