import express from "express";
const router = express.Router();
import {
  ADD_PRODUCT,
  GetAll,
  GetById,
  DeleteById,
  AddDetail,
} from "../controllers/AddData.js";

router.post("/addProduct", ADD_PRODUCT);
router.get("/getData", GetAll);
router.get("/getData/:id", GetById);
router.post("/delete/:id", DeleteById);
router.post("/adddata/:id", AddDetail);

export default router;
