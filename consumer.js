import { Worker } from "bullmq";

const connectionOpts = {
  host: "127.0.0.1",
  port: 6379,
};

const worker = new Worker(
  "add-data",
  async (job) => {
    const userData = {
      productDetails: job.data.orderDetails,
    };
    console.log("Received job:", userData);
  },
  { connection: connectionOpts } 
);

export default worker;
