import express from "express";
import * as endpoints from "./category.controller.js";
import { fileUpload } from "../../utils/files.uploads.js";
import { validation } from "../../middleware/validation.js";
import * as validationCategory from "./category.validation.js";
const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(
    fileUpload("image", "category"),
    validation(validationCategory.createCategorySchema),
    endpoints.addCategory
  )
  .put(
    fileUpload("image", "category"),
    validation(validationCategory.updateCategorySchema),
    endpoints.updateCategory
  )
  .delete(
    validation(validationCategory.CategorySchema),
    endpoints.deleteCategory
  );
categoryRouter.get("/getcategory/:_id", validation(validationCategory.CategorySchema), endpoints.getCategory)
categoryRouter.get("/getAll", endpoints.getAllCategory);

export default categoryRouter;
