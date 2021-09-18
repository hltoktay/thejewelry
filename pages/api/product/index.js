import connectDB from '../../../utils/connectDB';
import Products from '../../../models/productModel';
import auth from '../../../middleware/auth';

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProducts(req,res)
            break; 
         case "POST":
            await createProduct(req,res)
            break; 
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Products.find()
        
        res.json({
            status: 'success',
            result: products.length,
            products
        }) 
    } catch (err) {
        return res.status(500).json({err: err.message}) 
    }
}

const createProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin') return res.status(400).json({ err: 'Authentication required.' })

        const { product_id, title, price, inStock, category, ref, wgt, ppg, images } = req.body
        
        if (!product_id || !title || !price || !inStock || category === 'all' || !ref || !wgt || !ppg || images.length === 0)
        return res.status(400).json({ err: 'Please add all the fields.' })

        const product = await Products.findOne({product_id})
        if(product) return res.status(400).json({ err: 'This product already exist.' })

        const newProduct = new Products({
            product_id, title: title.toLowerCase(), price, inStock, category, ref, wgt, ppg, images
        })

        await newProduct.save()

        res.json({msg: 'Success! Created a new product.'})

    } catch (err) {
        return res.status(500).json({err: err.message}) 
    }
}