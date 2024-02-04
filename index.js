import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Authentiction from "./routes/UserAuth.js";
import GetData from "./routes/GetData.js";
import SearchCategory from "./routes/SearchCategory.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const URI = process.env.URI;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/auth", Authentiction);
app.use("/api/use", GetData);
app.use("/api/use",SearchCategory);

mongoose
  .connect(URI, {})
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});
