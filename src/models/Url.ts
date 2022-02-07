import mongoose, { Document } from "mongoose";

export interface UrlInterface extends Document {
  linkNumber: number;
  linkDomain: string;
}

const UrlSchema = new mongoose.Schema<UrlInterface>({
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

export default mongoose.model<UrlInterface>("Url", UrlSchema);
