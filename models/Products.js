import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    categoryType: {
      type: String,
      enum: [
        "clothes",
        "gadgets",
        "fashion",
        "grocery",
        "footwear",
        "electronics",
        "books",
        "toys",
        "beauty",
        "sports",
      ],
    },
    Details: {
      type: mongoose.Schema.ObjectId,
      ref: "Details",
    },
    Review: {
      type: mongoose.Schema.ObjectId,
      ref: "Review",
    },
    BookedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    Order_Database:{
      type:mongoose.Schema.ObjectId,
      ref:"OrderDatabase"
    }
  },

  { timestamps: true }
);

const Product_MODEL = mongoose.model("Product", ProductSchema);

export default Product_MODEL;
