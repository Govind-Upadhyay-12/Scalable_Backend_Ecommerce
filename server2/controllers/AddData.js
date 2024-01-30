import { kafka } from "../../apacheClient/apachekafka.js";
import Product_MODEL from "../models/Products.js";

export async function ADD_PRODUCT(req, res) {
  try {
    const { product_name, categoryType, Price } = req.body;
    console.log(req.body);

    const producer = kafka.producer();

    producer.on("producer.connect", async () => {
      console.log("Producer Connected Successfully");

      try {
        await producer.send({
          topic: "add-product",
          messages: [
            {
              value: JSON.stringify({
                product_name,
                categoryType,
                Price,
              }),
            },
          ],
        });

        console.log("Data sent successfully");
      } catch (sendError) {
        console.error("Error sending message:", sendError);
      } finally {
        await producer.disconnect();
        console.log("Producer Disconnected");
      }

      const newProduct = new Product_MODEL({
        product_name,
        categoryType,
        Price,
      });

      try {
        await newProduct.save();
        console.log("Product saved to the database");
      } catch (saveError) {
        console.error("Error saving product to the database:", saveError);
      }

      return res
        .status(200)
        .send({ message: "Product is added to the database" });
    });

    producer.on("producer.disconnect", () => {
      console.log("Producer Disconnected");
    });

    try {
      console.log("Connecting Producer");
      await producer.connect();
    } catch (connectError) {
      console.error("Error connecting to Kafka:", connectError);
      return res.status(500).send({ message: "Error connecting to Kafka" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
