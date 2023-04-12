import express from "express";
import * as endpoint from "./brands.controller.js";
import { fileUpload } from "../../utils/files.uploads.js";
import {validation } from "../../middleware/validation.js";
import * as brandValidation from './brands.validation.js';
const BrandRouter = express.Router();

BrandRouter.route("/")
  .post(fileUpload("logo" , 'brands'),validation(brandValidation.createBrandSchema), endpoint.addBrand)
  .put(fileUpload("logo" , 'brands'),validation(brandValidation.updateBrandSchema), endpoint.updateBrand)
  .delete(validation(brandValidation.BrandSchema),endpoint.deleteBrand);

BrandRouter.get("/getAll", endpoint.getAllBrands);

export default BrandRouter;
