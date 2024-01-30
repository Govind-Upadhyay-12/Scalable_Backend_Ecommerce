import { kafka } from ".././apacheClient/apachekafka.js";
import Product_MODEL from "./models/Products.js";
import mongoose from "mongoose";
import AddData_model from "./models/User.js";
import Redis from "ioredis";

const client = new Redis();

const runConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "group-1" });

  await consumer.connect();

  await consumer.subscribe({
    topics: ["authentication-update", "add-product"],
    fromBeginning: true,
  });

  const saveDataToRedis = async (data) => {
    const convertData = JSON.stringify(data);

    try {
      await client.rpush("prdouct-data", convertData);
      console.log("Added to the Redis list");
    } catch (error) {
      console.error("Error adding data to Redis list:", error);
    }
  };

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const messageValue = message.value.toString();
        console.log(
          `Received message on topic ${topic}, partition ${partition}:`,
          messageValue
        );

        if (topic === "authentication-update") {
          console.log("User Data:", messageValue);
        } else if (topic === "add-product") {
          await saveDataToRedis(JSON.parse(messageValue));
        }
      } catch (error) {
        console.error(
          `Error processing message on topic ${topic}, partition ${partition}:`,
          error
        );
      }
    },
  });
};

runConsumer().catch((error) => {
  console.error("Error in Kafka consumer:", error);
});
