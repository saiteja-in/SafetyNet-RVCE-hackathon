import express from "express";
import { test,getWeather } from "../controllers/weatherController";

const router=express.Router()

// api/weather/
router.get("/test",test);
router.get("/getWeather",getWeather);

export default router;