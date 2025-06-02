import Department from "../models/Department.js";
import Admin from "../models/Admin.js";
import ExpressError from "../utils/expressError.js";

// Create a new department
export const createDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) throw new ExpressError(400, "Department name is required");
    const department = new Department({ name });
    await department.save();
    await Admin.findByIdAndUpdate(req.user._id, {
      $push: { departments: department._id },
    });
    res.status(201).json({ message: "Department created", department });
  } catch (err) {
    next(err);
  }
};

// Edit a department
export const editDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await Department.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updated) throw new ExpressError(404, "Department not found");
    res.json({ message: "Department updated", department: updated });
  } catch (err) {
    next(err);
  }
};

// Delete a department
export const deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Department.findByIdAndDelete(id);
    if (!deleted) throw new ExpressError(404, "Department not found");
    await Admin.updateMany({}, { $pull: { departments: id } });
    res.json({ message: "Department deleted" });
  } catch (err) {
    next(err);
  }
};
