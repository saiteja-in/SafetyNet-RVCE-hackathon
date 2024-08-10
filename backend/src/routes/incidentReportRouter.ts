import express from "express";
import multer from "multer";
import IncidentReportController from "../controllers/IncidentReportController";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.get("/", IncidentReportController.getIncidentReports);

router.post(
  "/",
  upload.single("imageFile"),
  IncidentReportController.createIncidentReport
);

export default router;
