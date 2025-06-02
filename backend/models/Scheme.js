import mongoose from "mongoose";
import Department from "./Department";

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
      },
    },
  ],
  details: [
    {
      feild: {
        type: String,
      },
      feildType: {
        type: String,
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
  },
});

const Scheme = mongoose.model("Scheme", schemeSchema);

export default Scheme;
