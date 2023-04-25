import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "rating required"],
      min: 1,
    },
    comment: {
      type: String,
      required: [true, "review comment required"],
      minLength: [3, "too short comment"],
      trim: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "user Id required"],
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: [true, "product Id required"],
    },
  },
  { timestamp: true }
);

const reviewModel = mongoose.model("review", reviewSchema);
export default reviewModel;
