import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function SignUp(req, res) {
  try {
    const {
      userType,
      User_Name,
      Password,
      FirstName,
      LastName,
      Email,
      phoneNo,
    } = req.body;

    const userExists = await User.findOne({ Email }); // Changed find to findOne

    if (userExists) {
      return res.status(400).send({ message: "User already exists in DB" });
    }

    const hashedPassword = await bcryptjs.hash(Password, 10);

    const newUser = new User({
      userType,
      User_Name,
      Password: hashedPassword,
      FirstName,
      LastName,
      Email,
      phoneNo,
    });

    await newUser.save();
    console.log("New User Created");
    return res.status(200).send({ message: "User Created" });
  } catch (error) {
    if (!error.message.includes("E11000")) {
      throw error;
    } else {
      return res.status(409).send("Error: Email is already in use");
    }
  }
}
export const signin = async (req, res, next) => {
  const { Password, Email } = req.body;
  console.log(req.body);
  try {
    const validUser = await User.findOne({ Email });

    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcryptjs.compare(Password, validUser.Password); // Used async version of compare

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { Password: hashedPassword, ...rest } = validUser._doc;
    const token = jwt.sign(
      { email: validUser.Email, id: validUser._id },
      process.env.SECRET_KEY
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ ...rest, token });

    console.log("User logged in successfully");
  } catch (error) {
    console.error("Error signing in", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
