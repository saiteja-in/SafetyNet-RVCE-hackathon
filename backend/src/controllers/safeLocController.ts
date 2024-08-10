import { Request, Response } from "express";
import Location from "../models/safeLocsModel";


export const getSafeLocs = async (req:Request, res:Response) => {
  try {
    const safeLocs=await Location.find({},{ _id: 0,__v:0 }).exec();
    res.json(safeLocs);
  } catch (error) {
    console.log(error);
  }
};

export const insertSafeLocs = async (req:Request, res:Response) => {
  try {
    const data=req.body;
    // console.log(key,"===",location);
    console.log(data);
    
    const safeLocs=await Location.create({
      key:data.key,
      location:data.location
    });
    res.status(200).json({message:"success"});
  } catch (error) {
    console.log(error);
  }
};
