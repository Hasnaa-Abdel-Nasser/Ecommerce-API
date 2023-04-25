import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
    name : {
        type: String ,
        required: [true , 'brand name required'],
        trim: true
    },
    slug : {
        type: String ,
        lowercase: true
    },
    logo: String
},{timestamp: true});

brandSchema.post('init',(doc)=>{
    console.log(doc)
})
const brandModel = mongoose.model('brand' , brandSchema);

export default brandModel;