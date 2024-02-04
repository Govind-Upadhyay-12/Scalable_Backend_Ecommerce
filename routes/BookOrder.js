import express from "express";
import axios from "axios";
import User from "../models/User.js";
import { db } from "../server2/FireBase.js";
import { Queue } from "bullmq";



const connectionOpts = {
  host: "127.0.0.1",
  port: 6379,
};

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
    console.log(userFind)

    const Address_Detail = userFind.Address;
    const insertData = JSON.stringify(Address_Detail);

    try {
      var response = await axios.get(
        `http://localhost:3002/api/use/getData/${id1}`
      );
      
    } catch (error) {
      console.log(error);
    }
    const realdata = response.data;
    const actual = JSON.stringify(realdata);

    userFind.Item_Booked.push(id1);
    await userFind.save();

    const data_arr = [userFind];

    const All_Details_Archieve = {
      userDetails: insertData,
      item_name: actual,
    };

    const update_archieve = await db
      .collection("archieve")
      .add(All_Details_Archieve);

    console.log("hogya firebase me bhi");

    const Order_confirm=new Queue("add-data",{
      connection:connectionOpts,
    })
    const result=await Order_confirm.add("sending-data",{
      orderDetails:actual
    })
    console.log("job added to the queue and sent ",result.id);

    return res
      .status(200)
      .send({ message: "Order booked successfully, payment successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
