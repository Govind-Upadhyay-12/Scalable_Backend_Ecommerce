import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AddProduct from "./routes/AddProduct.js";

async function init() {
  try {
    const admin = kafka.admin();
    console.log("admin connecting");
    await admin.connect();
    console.log("admin connection success");
    console.log(`creating Data [Add-data]`);
    await admin.createTopics({
      topics: [
        {
          topic: "Add-data",
          numPartitions: 1,
        },
      ],
    });
    console.log("topic created success[authentication-update]");
    console.log("Disconnecting Admin..");
    await admin.disconnect();
  } catch (error) {
    console.error("Error in Kafka initialization:", error);
  }
}

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/use", AddProduct);

const URI = "mongodb://localhost:27017/scalable_backend_ecommerce";
mongoose
  .connect(URI, {
  }).then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});
