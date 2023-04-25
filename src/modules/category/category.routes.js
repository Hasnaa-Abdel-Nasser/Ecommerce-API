import express from "express";
import * as endpoints from "./category.controller.js";
import { SingleFile } from "../../utils/files.uploads.js";
import { validation } from "../../middleware/validation.js";
import * as validationCategory from "./category.validation.js";
import userAuth from "../../middleware/auth.js";
const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(
    SingleFile("image"),
    userAuth,
    validation(validationCategory.createCategorySchema),
    endpoints.addCategory
  )
  .put(
    SingleFile("image"),
    userAuth,
    validation(validationCategory.updateCategorySchema),
    endpoints.updateCategory
  )
  .delete(
    userAuth,
    validation(validationCategory.CategorySchema),
    endpoints.deleteCategory
  );
categoryRouter.get("/getcategory/:_id", validation(validationCategory.CategorySchema), endpoints.getCategory)
categoryRouter.get("/getAll", endpoints.getAllCategory);

export default categoryRouter;
