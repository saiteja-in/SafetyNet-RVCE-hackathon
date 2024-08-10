import { NextFunction, Request, Response } from "express";
// import User from "../models/userModel";
// import { errorHandler } from "../utils/error.js";
// import bcryptjs from "bcryptjs";
import axios from "axios";

export const test = async (req:Request, res:Response) => {
  res.send("api is working");
};

export const getWeather = async (req:Request, res:Response) => {
  // console.log(req.body);
  const {lat,lon}=req.body;
  try {
    const apiRes=await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
    // console.log(apiRes);
    res.json({data:apiRes.data})
  } catch (error) {
    console.log(error);
  }
};