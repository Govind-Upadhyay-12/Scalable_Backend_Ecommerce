import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "Ecommerce",
  brokers: ["172.28.224.1:9092"],
});
