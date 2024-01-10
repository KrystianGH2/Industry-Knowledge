import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {   
    username: String,
    title: String,
    description: String,
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number], // [longitude, latitude]
    },
  },
  { timestamps: true }
);

const safetyConcern =
  mongoose.models.safetyConcern || mongoose.model("safetyConcern", userSchema);

export default safetyConcern;
