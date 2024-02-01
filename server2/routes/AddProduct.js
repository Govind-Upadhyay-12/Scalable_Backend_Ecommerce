import express from "express";
const router=express.Router();
import { ADD_PRODUCT,GetAll,GetById,DeleteById } from "../controllers/AddData.js";

router.post('/addProduct',ADD_PRODUCT);
router.get('/getData',GetAll);
router.get('/getData/:id',GetById);
router.post('/delete/:id',DeleteById);

export default router;