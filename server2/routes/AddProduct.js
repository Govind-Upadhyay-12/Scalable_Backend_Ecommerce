import express from "express";
const router=express.Router();
import { ADD_PRODUCT } from "../controllers/AddData.js";

router.post('/addProduct',ADD_PRODUCT)
export default router;