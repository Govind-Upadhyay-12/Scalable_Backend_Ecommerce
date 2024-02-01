import express from "express";
import axios from "axios";
import client from "../redisclient/client.js";

const router = express.Router();
router.get("/all_product", async (req, res) => {
  try {
    const value = client.get("all-data");
    const converted = JSON.parse(value);
    if (value) {
      return res.status(200).json(converted);
    }
    const response = await axios.get(`http://localhost:3002/api/use/getData`);
    const data = response.data;
    await client.set("all-data", JSON.stringify(data));
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export default router;
