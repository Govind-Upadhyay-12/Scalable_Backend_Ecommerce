import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    User_Name: {
      type: String,
      required: true
    },
    Password: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Last_Login: {
      type: Date,
      default: Date.now,
    },
    Address: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
      },
    ],
    Item_Booked: {
      type: mongoose.Schema.ObjectId,
      ref: "Cart",
    },
    phoneNo:{
      type:Number,
      required:true
    }
  },
 

  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
