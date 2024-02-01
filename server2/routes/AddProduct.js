import express from "express";
const router=express.Router();
import { ADD_PRODUCT,GetAll } from "../controllers/AddData.js";

router.post('/addProduct',ADD_PRODUCT);
router.get('/getData',GetAll);

export default router;