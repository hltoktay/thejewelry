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

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = {...this.queryString}

        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(e1 => delete(queryObj[e1]))

        if(queryObj.category !== 'all')
            this.query.find({category: queryObj.category})

        if(queryObj.title !== 'all')
            this.query.find({title: {$regex: queryObj.title}})

        if(queryObj.ref !== 'all')
            this.query.find({ref: {$regex: queryObj.ref}})

        this.query.find()
        return this;
    }

    sorting() {
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else{
             this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 8
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const getProducts = async (req, res) => {
    try {
        const features = new APIfeatures(Products.find(), req.query)
        .filtering().sorting().paginating()

        const products = await features.query

        // const products = await Products.find()
        
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

        const { product_id, title, inStock, category, ref, wgt, ppg, images } = req.body
        const price = wgt * ppg
        
        if (!product_id || !title || !price === wgt * ppg || !inStock || category === 'all' || !ref || !wgt || !ppg || images.length === 0)
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