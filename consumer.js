import { kafka } from "./apacheClient/apachekafka.js";

const runConsumer = async () => {
    const consumer = kafka.consumer({ groupId: "group-1" });
  
    await consumer.connect();
  
    await consumer.subscribe({
      topics: ["authentication-update"],
    });
  
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("Received data from Kafka:", message.value.toString());
  
      },
    });
  };
  
  runConsumer().catch((error) => {
    console.error("Error in Kafka consumer:", error);
  });
  