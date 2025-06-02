import mongoose from "mongoose";
import { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const officerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      joinDate: {
        type: Date,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      post: {
        type: String,
        required: true,
      },
    },
    processedApplications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    role: {
      type: String,
      enum: ["officer"],
      default: "officer",
    },
  },
  {
    timestamps: true,
  }
);

// Attach Passport-Local Mongoose Plugin
officerSchema.plugin(passportLocalMongoose);

const Officer = mongoose.model("Officer", officerSchema);
export default Officer;
