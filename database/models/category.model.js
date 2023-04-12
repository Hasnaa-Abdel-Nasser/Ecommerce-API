import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name : {
        type: String ,
        required: [true , 'category name required'],
        trim: true
    },
    image : String,
    slug : {
        type: String ,
        lowercase: true
    },
},{timestamp: true});

const categoryModel = mongoose.model('category' , categorySchema);

export default categoryModel;