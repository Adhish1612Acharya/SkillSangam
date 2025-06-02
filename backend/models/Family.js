import mongoose from "mongoose";
import { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const familySchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    members: [
      {
        name: {
          type: String,
          required: true,
        },
        adhaarNumber: {
          type: String,
          required: true,
        },
        relationship: {
          type: String,
          required: true,
          enum: ["self", "spouse", "child", "parent", "sibling", "other"],
        },
      },
    ],
    familyHead: {
      fullName: {
        type: String,
        required: true,
      },
      adhaarNumber: {
        type: String,
        required: true,
      },
      relationship: {
        type: String,
        required: true,
        enum: ["self", "spouse", "child", "parent", "sibling", "other"],
      },
    },
    familyCode: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["family"],
      default: "family",
    },
  },
  {
    timestamps: true,
  }
);

// Attach Passport-Local Mongoose Plugin
familySchema.plugin(passportLocalMongoose);

const Family=mongoose.model("Family", familySchema);
export default Family;
