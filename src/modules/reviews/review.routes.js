import express from "express";
import userAuth from "../../middleware/auth.js";
import * as endpoints from "./review.controller.js";
import * as reviewValidation from "./review.validation.js";
import { validation } from "../../middleware/validation.js";
const reviewRouter = express.Router();
reviewRouter
  .route("/")
  .post(
    userAuth,
    validation(reviewValidation.createReviewSchema),
    endpoints.addReview
  )
  .put(
    userAuth,
    validation(reviewValidation.updateReviewSchema),
    endpoints.editReview
  )
  .delete(
    userAuth,
    validation(reviewValidation.ReviewSchema),
    endpoints.deleteReview
  );
reviewRouter.get("/allreviews", endpoints.getReviews);

export default reviewRouter;
