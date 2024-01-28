import mongoose from "mongoose";
const OrderDatabase = mongoose.Schema(
  {
    Address:{
        type: mongoose.Schema.ObjectId,
        ref:"Address"
    },
    quantity:{
        type:Number,
    }
  },
  { timestamps: true }
);

const Order_Database = mongoose.model("OrderDb", OrderDatabase);
export default Order_Database;
