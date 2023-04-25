import productModel from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catch.errors.js";
import { AppError } from "../../utils/response.error.js";
import slugify from "slugify";
import { ApiFeatures } from "../../middleware/api.features.js";
import cloudinary from "../../utils/cloudinary.js";

const addProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const result = await cloudinary.uploader.upload(req.files.imageCover[0].path,{ folder: "product" });
  req.body.imageCover = result.url;
  let x = req.files.images;
  let images = [];
  for (let i = 0; i < x.length; i++) {
    const result = await cloudinary.uploader.upload(x[i].path, {
      folder: "product",
    });
    images.push(result.url);
  }
  req.body.images = images;
  await productModel.insertMany(req.body);
  res.status(200).json({ message: "success" });
});

const updateProduct = catchError(async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  if (req.files.imageCover[0]) {
    const result = await cloudinary.uploader.upload(
      req.files.imageCover[0].path,
      { folder: "product" }
    );
    req.body.imageCover = result.url;
  }
  if (req.files.images) {
    let x = req.files.images;
    let images = [];
    for (let i = 0; i < x.length; i++) {
      const result = await cloudinary.uploader.upload(x[i].path, {
        folder: "product",
      });
      images.push(result.url);
    }
    req.body.images = images;
  }
  const product = await productModel.findByIdAndUpdate(req.body._id, req.body);
  !product && next(new AppError("Not Found Product", 400));
  product && res.status(200).json({ message: "success" });
});

const deleteProduct = catchError(async (req, res) => {
  const { _id } = req.body;
  await productModel.findByIdAndDelete(_id);
  res.status(200).json({ message: "success" });
});

const getAllProducts = catchError(async (req, res) => {
  const total = await productModel.countDocuments({});
  const totalPages = Math.ceil(total / 10);
  let features = new ApiFeatures(productModel.find(), req.query)
    .paginate(totalPages)
    .fields()
    .filter()
    .search()
    .sort();
  const products = await features.mongooseQuery;
  res.status(200).json({
    message: "success",
    totalPage: totalPages || 1,
    page: features.page,
    products,
  });
});

const getProduct = catchError(async (req, res, next) => {
  const { _id } = req.params;
  const product = await productModel.findOneById(_id);
  !product && next(new AppError("Not Found Product", 400));
  product && res.json({ message: "success", product });
});
export { addProduct, updateProduct, deleteProduct, getAllProducts, getProduct };
