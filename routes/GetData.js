import express from "express";
import axios from "axios";
import client from "../redisclient/client.js";

const router = express.Router();
router.get("/all_product", async (req, res) => {
  try {
    const value = await client.get("all-data");

    if (value) {
      const converted = JSON.parse(value);
      return res.status(200).json(converted);
    }

    const response = await axios.get(`http://localhost:3002/api/use/getData`);
    const data = response.data;
    await client.set("all-data", JSON.stringify(data));
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});
router.get("/get_data/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await client.get(`data-${id}`); 
      if (data) {
        const serialize = JSON.parse(data);
        return res.status(200).send(serialize);
      }
      console.log("yahan tak aara hai")
      const response = await axios.get(
        `http://localhost:3002/api/use/getData/${id}`
      );
      await client.set(`data-${id}`, JSON.stringify(response.data)); // Added await here
      return res.status(200).json(response.data);
    } catch (error) {
      console.error(error); // Changed console.log to console.error for better clarity
      return res.status(500).send({ message: error.message });
    }
  });
  
  export default router
