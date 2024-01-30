import mongoose from "mongoose";

const AddData = mongoose.Schema(
  {
    name:{
        type:String,
    }
  },

  { timestamps: true }
);

const AddData_model = mongoose.model("Data", AddData);

export default AddData_model
