import express from "express";
import axios from "axios";
import client from "../redisclient/client.js";

const router = express.Router();

router.post("/getCategory", async (req, res) => {
  try {
    console.log(req.query);
    const categoryType = req.query.categoryType;

    const response = await axios.post(
      `http://localhost:3002/api/use/searchByCategory`,
      {
        categoryType,
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

router.post("/filter", async (req, res) => {
  try {
    const { Price, categoryType, brand } = req.body;
    const Query_Generate = `${Price}${categoryType}${brand}`;

    const actual = await client.get(Query_Generate);

    if (actual) {
      return res.status(200).json(JSON.parse(actual));
    }

    const response = await axios.post(
      `http://localhost:3002/api/use/searchByFilter`,
      {
        Price,
        categoryType,
        brand,
      }
    );

    const data = response.data;
    const Parse_Data = JSON.parse(data);

    client.set(Query_Generate, JSON.stringify(Parse_Data), "EX", 5);

    return res.status(200).json(Parse_Data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});
