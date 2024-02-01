import Product_MODEL from "../models/Products.js";
import { Queue } from "bullmq";
import client from "../../redisclient/client.js";

const connectionOpts = {
  host: "127.0.0.1",
  port: 6379,
};
export async function ADD_PRODUCT(req, res) {
  try {
    const { product_name, categoryType, Price } = req.body;
    console.log(req.body);
    client.del("all-data");
    console.log("data_reset in redis");

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

export async function GetById(req, res) {
  try {
    console.log("aara hai yaha tk to");
    const { id } = req.params;
    const Data = await Product_MODEL.findById(id);
    if (Data) {
      return res.status(200).json(Data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

export async function DeleteById(req, res) {
  try {
    const { id } = req.params;
    const data = client.del(`data-${id}`);
    console.log("redis_reset_successfully");

    const find_product = Product_MODEL.findByIdAndDelete(id);
    return res.status(200).send({ message: "successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}
