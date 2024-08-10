import { Request, Response } from "express";
import IncidentReport from "../models/incidentReport"
import cloudinary from "cloudinary";

const getIncidentReports = async (req: Request, res: Response) => {
  try {
    const reports = await IncidentReport.find();
    res.json(reports);
  } catch (error) {
    console.log("Error fetching incident reports:", error);
    res.status(500).json({ message: "Error fetching incident reports" });
  }
};

const createIncidentReport = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    
    const imageUrl = req.file ? await uploadImage(req.file as Express.Multer.File) : undefined;

    const report = new IncidentReport({
      ...req.body,
      image: imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await report.save();

    res.status(201).json(report);
  } catch (error) {
    console.log("Error creating incident report:", error);
    res.status(500).json({ message: "Error creating incident report" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.secure_url;
};

export default {
  getIncidentReports,
  createIncidentReport,
};
