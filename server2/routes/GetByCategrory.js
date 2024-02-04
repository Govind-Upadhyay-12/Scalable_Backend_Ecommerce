import express from "express";
import Product_MODEL from "../models/Products.js";


const router = express.Router();

router.post("/searchByCategory", async (req, res) => {
  try {
    console.log(req.body);
    const { categoryType } = req.body;
    const result = await Product_MODEL.find({
      categoryType: { $regex: new RegExp(categoryType, "i") },
    });
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
});

router.post("/searchByFilter", async (req, res) => {
  const { categoryType, Price, brand } = req.body;
  try {
    console.log(req.body);

    const real_data = await Product_MODEL.find({
      categoryType: { $regex: new RegExp(categoryType, "i") },
      Price: { $lte: Price },
    })
      .populate({
        path: "Details",
        match: {
          brand: { $regex: new RegExp(brand, "i") },
        },
      })
      .exec();

     const actual_data=  JSON.stringify(real_data, null, 2)
    return res.status(200).json(actual_data);
  } catch (error) {
    console.log(error);
    return  res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
