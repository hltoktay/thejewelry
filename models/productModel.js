import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    }, 
    price: {
        type: Number,
        required: true,
        trim: true
    },
    ref: {
        type: String,
        required: true
    },
    wgt: {
        type: Number,
        required: true
    },
    ppg: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    inStock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    }       
}, {
    timestamps: true
})

let Dataset = mongoose.models.product || mongoose.model('product', productSchema)

export default Dataset