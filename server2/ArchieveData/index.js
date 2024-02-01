import { db } from "../FireBase.js";
import { Worker } from "bullmq";

const connectionOpts = {
  host: "127.0.0.1",
  port: 6379,
};

const worker = new Worker(
  "data-queue",
  async (job) => {
    try {
      const userJson = {
        product_name: job.data.name,
        categoryType: job.data.categoryType,
        Price: job.data.Price,
      };
      const takeData = await db.collection("users").add(userJson);
      console.log("data added");
    } catch (error) {
      console.log(error);
    }
  },
  { connection: connectionOpts }
);

