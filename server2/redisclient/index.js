import redis from "redis";

const client = redis.createClient("redis://127.0.0.1:6379");

client.connect();

client.on("connect", function () {
  console.log("connected to redis");
});

export default client;  