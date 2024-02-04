import express from "express";
import axios from "axios";
import User from "../models/User.js";
import { db } from "../server2/FireBase.js";

const router = express.Router();

router.post("/AddToCart/:id/:id1", async (req, res) => {
  const { id, id1 } = req.params;
  try {
    const Find_User = await User.findById(id);

    Find_User.Cart_Item.push(id1);

    await Find_User.save();

    return res.status(200).send({ message: "Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
});

router.post("/BookOrder/:id/:id1", async (req, res) => {
  try {
    const { id, id1 } = req.params;
    const userFind = await User.findById(id).populate("Address");

    console.log(userFind);

    let realdata;
    try {
      const response = await axios.get(
        `http://localhost:3002/api/use/getData/${id1}`
      );
      realdata = response.data;
      console.log("data agya ", realdata);
    } catch (error) {
      console.log(error);
    }

    userFind.Item_Booked.push(id1);
    await userFind.save();

    const orderDetailsRef = await db
      .collection("order_details")
      .add({ data: realdata });
    const userDetailsRef = await orderDetailsRef
      .collection("userdetails")
      .add({ user: userFind.toJSON() });

    return res
      .status(200)
      .send({ message: "Order booked successfully, payment successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;