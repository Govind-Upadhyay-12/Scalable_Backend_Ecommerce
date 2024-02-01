import { Worker } from "bullmq";
import { db } from "./FireBase.js";
import Product_MODEL from "./models/Products.js";

const connectionOpts = {
  host: "127.0.0.1",
  port: 6379,
};

const worker = new Worker(
  "data-queue",
  async (job) => {
    const userJson = {
      product_name: job.data.name,
      categoryType: job.data.categoryType,
      Price: job.data.Price,
    };

    console.log(userJson);

    try {
      const response = await db.collection("users").add(userJson);
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  },
  { connection: connectionOpts }
);
