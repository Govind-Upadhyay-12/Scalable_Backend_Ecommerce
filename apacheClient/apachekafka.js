import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "Ecommerce",
  brokers: ["172.16.159.54:9092"],
});
