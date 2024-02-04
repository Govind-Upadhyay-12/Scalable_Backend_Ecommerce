import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Authentiction from "./routes/UserAuth.js";
import GetData from "./routes/GetData.js";
import SearchCategory from "./routes/SearchCategory.js";
import AddToCart from "./routes/BookOrder.js";
import Address from "./routes/AddressUser.js";
import worker from "./consumer.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const URI = process.env.URI;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/auth", Authentiction);
app.use("/api/use", GetData);
app.use("/api/use", SearchCategory);
app.use("/api/use", AddToCart);
app.use("/api/use", Address);

mongoose
  .connect(URI, {})
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});
