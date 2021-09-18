import Head from 'next/head';
import { useState, useContext } from 'react'
import { DataContext } from '../../store/GlobalState';
import { imageUpload } from '../../utils/imageUpload'
import { postData } from '../../utils/fetchData'

const ProductManager = () => {

    const initialState = {
        product_id: '',
        title: '',
        price: 0,
        inStock: 0,
        ref: '',
        wgt: '',
        ppg: '',
        category: ''
    }

    const [product, setProduct ] = useState(initialState)
    const { product_id, title, price, inStock, category, ref, wgt, ppg } = product

    const [ images, setImages ] = useState([])

    const { state, dispatch } = useContext(DataContext); 
    const { categories, auth } = state;

    const handleChangeInput = e => {
        const {name, value } = e.target
        setProduct({...product, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUploadInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})

        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if(files.length === 0) 
        return  dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})
       
        files.forEach(file => {
            if(file.size > 1024 * 1024 )
            return err = 'The largest image size is 1mb.'

               if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
            return err = 'Image format is incorrect.'

            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;
        })
       
       if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

       const imgCount = images.length
       if(imgCount + newImages.length > 5)
       return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 5 images.'}})
       setImages([...images, ...newImages])

    }

    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(auth.user.role !== 'admin')
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication required.'}})

        const price = wgt * ppg
          
        if (!product_id || !title || !price || !inStock || category === 'all' || !ref || !wgt || !ppg || images.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: console.log(product)}})

        dispatch({ type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0 ) media = await imageUpload(imgNewURL)

        const res = await postData('product', {...product, images: [...imgOldURL, ...media]}, auth.token)
        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})

    }
 
    return (
        <div className="container products_manager">
            <Head>
                <title>Products Manager</title>
            </Head>

            <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <input type="text" name="product_id" value={product_id} 
                    placeholder="Product ID" className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                     <input type="text" name="title" value={title} 
                    placeholder="Title" className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                       <div className="row">
                        <div className="col-sm-4">
                            <input type="text" name="ref" value={ref}
                                placeholder="Ref" className="d-block my-4 w-100 p-2"
                                onChange={handleChangeInput} />
                        </div>

                        <div className="col-sm-4">
                            <input type="number" name="wgt" value={wgt}
                                placeholder="Weight" className="d-block my-4 w-100 p-2"
                                onChange={handleChangeInput} />
                        </div>
                          <div className="col-sm-4">
                            <input type="number" name="ppg" value={ppg}
                                placeholder="Price Per Gram" className="d-block my-4 w-100 p-2"
                                onChange={handleChangeInput} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                        <label htmlFor="price">Price</label>
                            <input type="number" name="price" value={wgt * ppg}
                                placeholder="Price" className="d-block w-100 p-2"
                                onChange={handleChangeInput} />
                        </div>

                        <div className="col-sm-6">
                           <label htmlFor="inStock">In Stock</label>
                            <input type="number" name="inStock" value={inStock}
                                placeholder="In Stock" className="d-block w-100 p-2"
                                onChange={handleChangeInput} />
                        </div>
                    </div>

                <div className="input-group-prepend px-0 my-2">
                    <select name="category" id="category" value={category}
                    onChange={handleChangeInput} className="form-select text-capitalize">
                        <option value="all">All Products</option>
                        {
                            categories.map(item => (
                                 <option key={item._id} value={item._id}>
                                    {item.name}
                                 </option>
                            ))
                        }
                    </select>
                </div>
                   
                </div>
                <div className="col-md-6 my-4">
                    <div className="input-group mb-3">
                    
                        <div className="input-group ">
                             <input type="file" className="custom-file-input"
                                onChange={handleUploadInput} multiple accept="image/*" />
                            <label className="input-group-text" for="inputGroupFile02">Upload</label>
                        </div>
    

                    </div>

                    <div className="row img-up mx-0">
                        {
                            images.map((img, index) => (
                                <div key={index} className="file_img my-2">
                                    <img src={img.url ? img.url : URL.createObjectURL(img)}
                                        alt="" className="img-thumbnail rounded" />

                                        <span onClick={() => deleteImage(index)}>X</span>
                                </div>
                            ))
                        }
                    </div>


                </div>

            
                <button type="submit" className="btn btn-info col-6 text-white my-2 px-4">Create</button>

            </form>

        </div>
    )
}

export default ProductManager;