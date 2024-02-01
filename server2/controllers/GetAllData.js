import Product_MODEL from "../models/Products.js";

export async function GetAll(req, res) {
  try {
    const data = await Product_MODEL.find({});
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
