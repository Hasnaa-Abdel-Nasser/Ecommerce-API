import brandModel from "../../../database/models/brands.model.js";
import { catchError } from '../../middleware/catch.errors.js';
import slugify from "slugify";

const addBrand = catchError(async(req , res)=>{
    const {name} = req.body;
    let slug = slugify(name);
    await brandModel.insertMany({name , slug,logo: req.file['filename']});
    res.status(200).json({message: "success"});
});

const updateBrand = catchError(async(req , res)=>{
    const {_id , name} = req.body;
    let slug = slugify(name);
    await brandModel.findByIdAndUpdate(_id , {name ,slug, logo: req.file['filename']});
    res.status(200).json({message: "success"});
});

const deleteBrand = catchError(async(req, res)=>{
    const {_id} = req.body;
    await brandModel.findByIdAndDelete(_id);
    res.status(200).json({message: "success"});
});

const getAllBrands = catchError(async(req, res)=>{
    const brands = await brandModel.find();
    res.status(200).json({message: "success" , brands});
})

export { addBrand, updateBrand, deleteBrand, getAllBrands };
