import subcategoryModel from "../../../database/models/subcategory.model.js";
import slugify from 'slugify';
import {AppError} from '../../utils/response.error.js';
import {catchError} from '../../middleware/catch.errors.js';

const addSubcategory = catchError(async(req , res)=>{
    req.body.slug = slugify(req.body.name);
    await subcategoryModel.insertMany(req.body);
    res.status(200).json({message: "success"});
})

const updateSubcategory = catchError(async(req , res , next)=>{
    if(req.body.name) req.body.slug = slugify(req.body.name);
    const subcategory = await subcategoryModel.findByIdAndUpdate(_id, req.body);
    !subcategory&& next(new AppError('Not found subcategory' , 400))
    subcategory && res.status(200).json({message: "success"});
})

const deleteSubcategory = catchError(async(req , res)=>{
    const {_id} = req.body;
    await subcategoryModel.findByIdAndDelete(_id);
    res.status(200).json({message: "success"});
})

const getAllSubcategory = catchError(async(req , res)=>{
    const subcategorys = await subcategoryModel.find();
    res.status(200).json({message: "success" ,subcategorys});
})

export{addSubcategory , updateSubcategory , deleteSubcategory , getAllSubcategory};