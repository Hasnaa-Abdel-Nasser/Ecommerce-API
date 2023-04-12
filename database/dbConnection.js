import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connect = mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

export default connect;
