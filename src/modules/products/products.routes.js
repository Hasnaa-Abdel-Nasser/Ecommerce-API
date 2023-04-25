import express from "express";
import * as endpoints from "./products.controller.js";
import { MultiFile } from "../../utils/files.uploads.js";
import * as productValidation from "./products.validation.js";
import { validation } from "../../middleware/validation.js";
import userAuth from "../../middleware/auth.js";
const productRouter = express.Router();
let fieldsArray = [{name:'imageCover' , maxCount:1},{name:'images' , maxCount: 10}];
productRouter
  .route("/")
  .post(
    MultiFile(fieldsArray),
    userAuth,
    validation(productValidation.newProductSchema),
    endpoints.addProduct
  )
  .put(
    MultiFile(fieldsArray),
    userAuth,
    validation(productValidation.updateProductSchema),
    endpoints.updateProduct
  )
  .delete(userAuth,validation(productValidation.productSchema), endpoints.deleteProduct);

productRouter.get(
  "/product/:_id",
  validation(productValidation.productSchema),
  endpoints.getProduct
);
productRouter.get("/getAll", endpoints.getAllProducts);

export default productRouter;
