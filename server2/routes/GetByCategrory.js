import express from "express";
import Product_MODEL from "../models/Products.js";
import User from "../../models/User.js";


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


router.post("/Book_Bulk", async (req, res) => {
  try {
    const { data } = req.body;
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
      const id1 = data[i];
      const productFind = await Product_MODEL.findById(id1);
      sum += productFind.Price;
    }

    return res.status(200).json({
      price: sum
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
});

export default router;
