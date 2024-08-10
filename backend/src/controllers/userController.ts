import { NextFunction, Request, Response } from "express";
// import User from "../models/userModel";
// import { errorHandler } from "../utils/error.js";
// import bcryptjs from "bcryptjs";

export const test = async (req:Request, res:Response) => {
  res.send("api is working");
};

export const updateUser = async (req:Request, res:Response, next:NextFunction) => {
  console.log(req.body);
  res.send({msg:req.body});
};