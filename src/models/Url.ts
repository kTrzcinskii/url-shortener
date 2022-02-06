import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  linkNumber: {
    type: Number,
    unique: true,
    required: [true, "Something went wrong with creating link number"],
  },
  linkDomain: {
    type: String,
    unique: true,
    required: [true, "Please provide a link"],
  },
});

export default mongoose.model("Url", UrlSchema);
