import express from "express";
import * as endpoint from "./brands.controller.js";
import { SingleFile } from "../../utils/files.uploads.js";
import { validation } from "../../middleware/validation.js";
import * as brandValidation from "./brands.validation.js";
import userAuth from "../../middleware/auth.js";
const BrandRouter = express.Router();

BrandRouter.route("/")
  .post(
    SingleFile("logo"),
    userAuth,
    validation(brandValidation.createBrandSchema),
    endpoint.addBrand
  )
  .put(
    SingleFile("logo"),
    userAuth,
    validation(brandValidation.updateBrandSchema),
    endpoint.updateBrand
  )
  .delete(
    userAuth,
    validation(brandValidation.BrandSchema),
    endpoint.deleteBrand
  );

BrandRouter.get("/getAll", endpoint.getAllBrands);

export default BrandRouter;
