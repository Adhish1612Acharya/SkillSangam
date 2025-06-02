import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
  },
  status: {
    process: {
      type: Boolean,
    },
    accepted: {
      type: Boolean,
    },
  },
  rejectReason: {
    type: String,
    deafault: null,
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Officer",
    default: null,
  },
  scheme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scheme",
  },
  details: [
    {
      feild: {
        type: String,
      },
      data: {
        type: String,
      },
    },
  ],
});

export default new mongoose.model("Application", applicationSchema);
