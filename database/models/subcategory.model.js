import mongoose from "mongoose";

const subcategorySchema = mongoose.Schema({
    name: {
        type: String ,
        minLength:3,
        required: [true , 'subcategory name required'],
        trim: true
    },
    slug: {
        type: String ,
        lowercase: true
    },
    categoryId:{
        type: mongoose.Types.ObjectId,
        ref: "category"
    }
},{timestamp: true});

const subcategoryModel = mongoose.model('subcategory' , subcategorySchema);
export default subcategoryModel;