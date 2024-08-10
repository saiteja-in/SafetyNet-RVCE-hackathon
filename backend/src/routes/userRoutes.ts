import express from "express";
import { test,updateUser } from "../controllers/userController";

const router=express.Router()

// api/user/
router.get("/test",test);
router.get("/update",updateUser);

export default router;