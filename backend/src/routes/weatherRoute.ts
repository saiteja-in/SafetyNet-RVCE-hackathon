import express from "express";
import { test,getWeather } from "../controllers/weatherController";

const router=express.Router()

// api/weather/
router.get("/test",test);
router.post("/getWeather",getWeather);

export default router;