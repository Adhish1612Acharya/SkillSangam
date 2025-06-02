import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { isAdmin } from "../middlewares/adminMiddlewares.js";
import {
  createDepartment,
  editDepartment,
  deleteDepartment,
} from "../controllers/department.js";

const router = express.Router();

// Create a new department
router.post("/", isAdmin, wrapAsync(createDepartment));

// Edit a department
router.put("/:id", isAdmin, wrapAsync(editDepartment));

// Delete a department
router.delete("/:id", isAdmin, wrapAsync(deleteDepartment));

export default router;
