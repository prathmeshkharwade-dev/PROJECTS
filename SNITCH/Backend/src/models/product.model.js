import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    price: {
        amount: {
            type: Number,
             required: true
        },
        currency: {
            type: String,
            enm: ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR '], // Add more currencies as needed
            default: 'INR'
        }
        
    },
    Images: [
        {
            url: {
                type: String,
                required: true
            }
            
        } 
    ]      
}, { timestamps: true })


const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;