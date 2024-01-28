import express from "express";
import { SignUp, signin } from "../controllers/Authentication.js";
const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", signin);

export default router;
