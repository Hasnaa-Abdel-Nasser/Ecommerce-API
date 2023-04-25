import brandModel from "../../../database/models/brands.model.js";
import { ApiFeatures } from "../../middleware/api.features.js";
import { catchError } from '../../middleware/catch.errors.js';
import slugify from "slugify";
import cloudinary from "../../utils/cloudinary.js";

const addBrand = catchError(async(req , res)=>{
    req.body.slug = slugify(req.body.name);
    const result = await cloudinary.uploader.upload( req.file.path , {folder:"logo"})
    req.body.logo = result.url
    await brandModel.insertMany(req.body);
    res.status(200).json({message: "success"});
});

const updateBrand = catchError(async(req , res)=>{
  if (req.body.name) req.body.slug = slugify(req.body.name);
    const result = await cloudinary.uploader.upload( req.file.path , {folder:"logo"})
    req.body.logo = result.url
    await brandModel.findByIdAndUpdate(req.body._id);
    res.status(200).json({message: "success"});
});

const deleteBrand = catchError(async(req, res)=>{
    const {_id} = req.body;
    await brandModel.findByIdAndDelete(_id);
    res.status(200).json({message: "success"});
});

const getAllBrands = catchError(async(req, res)=>{
    const total = await brandModel.countDocuments({});
  const totalPages = Math.ceil(total / 10);
  let features = new ApiFeatures(brandModel.find(), req.query)
    .paginate(totalPages)
    .filter()
    .search();
  const brands = await features.mongooseQuery;
  res.status(200)
    .json({
      message: "success",
      totalPage: totalPages || 1,
      page: features.page,
      brands,
    });
})

export { addBrand, updateBrand, deleteBrand, getAllBrands };
