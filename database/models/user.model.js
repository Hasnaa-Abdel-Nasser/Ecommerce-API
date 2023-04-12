import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String ,
    email: String,
    password: String,
    phoneNumber : String,
    profileImage: String,
    code: String,
    verified:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum: ['admin' , 'user'],
        default: 'user'
    }
},{timestamp: true})

const userModel = mongoose.model('user' , userSchema);
export default userModel;