import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AddProduct from "./routes/AddProduct.js";
import { db } from "./FireBase.js";
import User from  "./models/User.js"
import Product_MODEL from "./models/Products.js";
import worker from "./Consumer.js";



const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/use", AddProduct);

const URI = "mongodb://localhost:27017/scalable_backend_ecommerce";
mongoose
  .connect(URI, {})
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });


async function saveDummyData() {
  const take_data=await db.collection("users");
  const all_data=await take_data.get();
  const data=[];
  all_data.forEach((doc)=>{
    data.push(doc.data());
  })
  const usual=data[0];;
  try {
    const dataSaved = await new Product_MODEL({
      product_name:usual.product_name,
      Price:usual.Price
    });
    await dataSaved.save();
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

 
// saveDummyData();
// console.log("data addeed")
app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});
