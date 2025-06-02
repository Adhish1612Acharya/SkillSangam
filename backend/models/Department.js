import mongoose from "mongoose";
import { Schema } from "mongoose";

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    officers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Officer",
      },
    ],
    schemes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Scheme",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Departmen", departmentSchema);
export default Department;
