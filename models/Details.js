import mongoose from "mongoose";

const Details = mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    material: {
      type: String,
    },
    weight: {
      type: Number,
    },
    quantityInStock: {
      type: Number,
      default: 0,
    },
    specification: {
      type: Map,
      of: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Details_MODEL = mongoose.model("Details", Details);

export default Details_MODEL;
