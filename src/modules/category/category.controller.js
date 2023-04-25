import categoryModel from "../../../database/models/category.model.js";
import slugify from "slugify";
import { AppError } from "../../utils/response.error.js";
import { catchError } from "../../middleware/catch.errors.js";
const addCategory = catchError(async(req , res)=>{
    req.body.slug = slugify(req.body.name);
    const result = await cloudinary.uploader.upload(req.file.path,{ folder: "category" });
    req.body.image = result.url;
    await categoryModel.insertMany(req.body);
    res.status(200).json({message: "success"});
})

const updateCategory = catchError(async(req , res)=>{
    if(req.body.file) req.body.slug = slugify(name);
    if(req.file) {
        const result = await cloudinary.uploader.upload(req.file.path,{ folder: "category" });
        req.body.image = result.url;
    }
    await categoryModel.findByIdAndUpdate(req.body._id,req.body);
    res.status(200).json({message: "success"});
})

const deleteCategory = catchError(async(req , res)=>{
    const {_id} = req.body;
    await categoryModel.findByIdAndDelete(_id);
    res.status(200).json({message: "success"});
})

const getAllCategory = catchError(async(req , res)=>{
    const categorys = await categoryModel.find();
    res.status(200).json({message: "success" , categorys});
})

const getCategory = catchError(async(req , res , next)=>{
    const{_id} = req.params;
    const category = await categoryModel.findById(_id);
    if(category)     res.status(200).json({message: "success" ,category});
    next(new AppError("Not Found" , 400));
});
export{addCategory , updateCategory , deleteCategory , getAllCategory , getCategory};