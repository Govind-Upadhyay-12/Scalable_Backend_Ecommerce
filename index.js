import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Authentiction from "./routes/UserAuth.js";
import { kafka } from "./apacheClient/apachekafka.js";
dotenv.config();

async function init() {
  try {
    const admin = kafka.admin();
    console.log("admin connecting");
    await admin.connect();
    console.log("admin connection success");
    console.log(`creating authentication [authenctication-update]`);
    await admin.createTopics({
      topics: [
        {
          topic: "authentication-update",
          numPartitions: 2,
        },
      ],
    });
    console.log("topic created success[authentication-update]");
    console.log("Disconnecting Admin..");
    await admin.disconnect();
  } catch (error) {
    console.error("Error in Kafka initialization:", error);
    
    process.exit(1); 
  }
}

const app = express();
const PORT = process.env.PORT || 3001;
const URI = process.env.URI;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/auth", Authentiction);

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  init();
  console.log(`server is running on Port ${PORT}`);
});
