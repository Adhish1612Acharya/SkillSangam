import mongoose from "mongoose";
import { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const personnelSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
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
      serviceNumber: {
        type: String,
        required: true,
        unique: true,
      },
      rank: {
        type: String,
        required: true,
      },
      unitOrRegiment: {
        type: String,
        required: true,
      },
    },
    familyHead: {
      fullName: {
        type: String,
        required: true,
      },
      adhaarNumber: {
        type: String,
        required: true,
      },
    },
    familyCode: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["personnel"],
      default: "personnel",
    },
  },
  {
    timestamps: true,
  }
);

// Attach Passport-Local Mongoose Plugin
personnelSchema.plugin(passportLocalMongoose);

const Personnel = mongoose.model("Personnel", personnelSchema);
export default Personnel;
