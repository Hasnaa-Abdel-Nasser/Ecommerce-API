import express from "express";
import * as endpoints from "./subcategory.controller.js";
import userAuth from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as subcategoryValidation from "./subcategory.validation.js";
const subcategoryRouter = express.Router();

subcategoryRouter
  .route("/")
  .post(
    userAuth,
    validation(subcategoryValidation.newSubcategorySchema),
    endpoints.addSubcategory
  )
  .put(
    userAuth,
    validation(subcategoryValidation.updateSubcategorySchema),
    endpoints.updateSubcategory
  )
  .delete(
    userAuth,
    validation(subcategoryValidation.subcategorySchema),
    endpoints.deleteSubcategory
  );

subcategoryRouter.get("/getAll", endpoints.getAllSubcategory);

export default subcategoryRouter;
