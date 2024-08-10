import mongoose from 'mongoose';

// Define the schema for the incident report
const incidentReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  incidentLocation: {
    type: String,
    required: true,
  },
  typeofdisaster:{
    type:String,
    required:true
  },
  incidentCity: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  severity: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  image: {
    type: String,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified:{
    type:String,
    default:"No"
  }
});

// Create and export the model
const IncidentReport = mongoose.model('IncidentReport', incidentReportSchema);
export default IncidentReport;
