import dotenv from "dotenv";
import express, { Errback, Express, NextFunction, Request, Response } from "express";
import userRoute from "./routes/userRoutes";
import myReportRoute from "./routes/incidentReportRouter"
import { v2 as cloudinary } from 'cloudinary'
import authRoute from "./routes/auth.route";
import weatherRoute from "./routes/weatherRoute";
import safeLocsRoute from "./routes/safeLocsRoute"
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI||'')
  .then(() => {
    console.log("connected to mongoose");
  })
  .catch((err) => {
    console.log(err);
  });

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())
cloudinary.config({
  cloud_name:"dvl1fcwo2",
  api_key:"977914559279777",
  api_secret:"lI0WEcvW-IkB3teWRBEQR5B72t8"
})

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/weather",weatherRoute);
app.use("/api/safe-locs",safeLocsRoute);
app.use("/api/my/report", myReportRoute);



app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
  const statusCode=err.statusCode || 500;
  const message=err.message || "Internal Server Error";
  res.status(statusCode).json({
      success:false,
      statusCode,
      message
  });
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});