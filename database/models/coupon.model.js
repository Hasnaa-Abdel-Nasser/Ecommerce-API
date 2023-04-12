import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    code : String ,
    expires : Date,
    discount : Number
},{timestamp: true});

const couponModel = mongoose.model('coupon' , couponSchema);

export default couponModel;