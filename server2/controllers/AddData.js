import Product_MODEL from "../models/Products.js";
import { Queue } from "bullmq";

const connectionOpts = {
  host: "127.0.0.1",
  port: 6379,
};
export async function ADD_PRODUCT(req, res) {
  try {
    const { product_name, categoryType, Price } = req.body;
    console.log(req.body);

    const notificationQueue = new Queue("data-queue", {
      connection: connectionOpts,
    });

    const result = await notificationQueue.add("data-adding-to-queue", {
      name: product_name,
      categoryType: categoryType,
      Price: Price,
    });
    console.log("Job added to the queue", result.id);

    try {
      console.log("Product saved to the database");
    } catch (saveError) {
      console.error("Error saving product to the database:", saveError);
    }

    return res
      .status(200)
      .send({ message: "Product is added to the database" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export async function GetAll(req, res) {
  try {
    const data = await Product_MODEL.find({});
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
