import express from "express";
import Address_Schema from "../models/Address.js";
import User from "../models/User.js";
const router = express.Router();

router.post("/Add_Address/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Country, city, Address_Line1, Office_Address, Zip_code } = req.body;
    const User_Find = await User.findById(id);
    const Address_Create = await new Address_Schema({
      Country,
      city,
      Address_Line1,
      Office_Address,
      Zip_code,
    });
    await Address_Create.save();
    const Address_id = await Address_Create._id;
    await User_Find.Address.push(Address_id);
    await User_Find.save();
    return res.status(200).send({ message: "Address updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
});

export default router;
