import Head from 'next/head';
import { useState } from 'react';
import { getData } from '../../utils/fetchData'

const DetailProduct = (props) => {
    const [ product ] = useState(props.product)

    const [tab, setTab] = useState(0)


    const isActive = (index) => {
        if(tab ===index) return " active";
        return ""
    }


    return (
      <div className="row mx-5 detail_page">
        <Head>
          <title>Detail Products</title>
        </Head>

        <div className="col-md-6 mt-5">
          <h2 className="text-uppercase">{product.ref}</h2>
          <h6 className="text-uppercase">{product.title}</h6>

          <table class="table mt-3">
            <thead style={{ backgroundColor: "#e6d9bf" }}>
              <tr>
                <th scope="col">Ref</th>
                <th scope="col">Wgt</th>
                <th scope="col">Cost</th>
                <th scope="col">Price</th>
                <th scope="col">In Stock</th>
                <th scope="col">Sold</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{product.ref}</th>
                <td>{product.wgt}</td>
                <td>{product.cost}</td>
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
            <button type="button" className="btn btn-dark d-block my-3 px-5">
                ADD TO CART
            </button>
        </div>

        <div className="col-md-6">
          <img
            style={{ height: "350px" }}
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