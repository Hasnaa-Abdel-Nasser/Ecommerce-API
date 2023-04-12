import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title : {
        type: String ,
        required: [true , 'product title required'],
        unique: [true , 'Product title is unique'],
        minLength: [3 , 'too short product title'],
        trim: true,
    },
    slug : {
        type: String ,
        lowercase: true
    },
    price: {
        type: Number ,
        required: [true , 'product price required'],
       min : 1,
    },
    priceAfterDiscount: Number , 
    discription: {
        type: String ,
        required: [true , 'product title required'],
        minLength: [5 , 'too short product discription'],
        trim: true,
    },
    ratingCount: {
        type: Number ,
        min: [1 , 'rating average must be greater then 1'],
        max: [5 , 'rating average must be less or equel then 5'],
        default: 0
    },
    ratingAvg:{
        type: Number ,
        min: 0,
        default: 0
    },
    quantity: {
        type: Number ,
        required: [true , 'product quantity required'],
        min: 0,
        default: 0
    },
    imageCover: String,
    images: [String],
    colors:[String],
    categoryId:{
        type: mongoose.Types.ObjectId,
        ref: "category",
        required: [true , 'product category required'],
    },
    subcategoryId:{
        type: mongoose.Types.ObjectId,
        ref: "subcategory",
        required: [true , 'product subcategory required'],
    },
    brandId:{
        type: mongoose.Types.ObjectId,
        ref: "brand",
        required: [true , 'product brand required'],
    }
},{timestamp: true});

const productModel = mongoose.model('product', productSchema);

export default productModel;