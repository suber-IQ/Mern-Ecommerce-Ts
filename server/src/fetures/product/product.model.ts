import mongoose, { Model, Schema } from 'mongoose';
import { IProduct } from './product.interface';



const productSchema: Schema<IProduct> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter product Name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true,'Please Enter product Description'],
    },
    price: {
        type: Number,
        required: [true, 'Please Enter product Description'],
        maxLength: [8, 'Price cannot exceed 8 characters']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true,'Please Enter Product Category']
    },
    Stock: {
        type: Number,
        required: [true, 'Please Enter Product Stock'],
        maxLength: [4, 'Stock cannot exceed 4 characters'],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ProductModel: Model<IProduct>  = mongoose.model('Product',productSchema);

export default ProductModel;
