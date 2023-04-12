import express from "express";
import * as endpoints from "./products.controller.js";
import { fileUpload } from "../../utils/files.uploads.js";
import * as productValidation from "./products.validation.js";
import { validation } from "../../middleware/validation.js";
const productRouter = express.Router();

productRouter
  .route("/")
  .post(
    fileUpload("imageCover"),
    validation(productValidation.newProductSchema),
    endpoints.addProduct
  )
  .put(
    fileUpload("imageCover"),
    validation(productValidation.updateProductSchema),
    endpoints.updateProduct
  )
  .delete(validation(productValidation.productSchema), endpoints.deleteProduct);

productRouter.get(
  "/product/:_id",
  validation(productValidation.productSchema),
  endpoints.getProduct
);
productRouter.get("/getAll", endpoints.getAllProducts);

export default productRouter;
