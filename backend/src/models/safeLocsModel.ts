import mongoose from "mongoose";

const safeLocsSchema=new mongoose.Schema(
  {
    key:{type:String,require:true},
    location:{
      lat:{type:Number,require:true},
      lng:{type:Number,require:true}
    }
  }
)

const Location=mongoose.model("Location",safeLocsSchema);

export default Location;
