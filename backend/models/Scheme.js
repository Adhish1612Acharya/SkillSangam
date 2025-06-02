import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { 
    type: String,
    required: true,
  },
  steps: [
    {
      content: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now,
      }
    }
  ],
  details: [
  {
  feild:{
    type:String
  },
  feildType:{
    type:String
  }  
  }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Official',
    required: true,
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
  }
});

export default mongoose.model("Schemes", schemeSchema);
