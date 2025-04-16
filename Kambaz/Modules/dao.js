import { v4 as uuidv4 } from "uuid";
import ModuleModel from "./model.js";

// Find all modules for a course
export const findModulesForCourse = async (courseId) => {
  return ModuleModel.find({ course: courseId });
};

// Create a new module for a course
export const createModule = async (module) => {
  const newModule = { ...module, _id: uuidv4() };
  return ModuleModel.create(newModule);
};

// Delete a module by ID
export const deleteModule = async (moduleId) => {
  return ModuleModel.deleteOne({ _id: moduleId });
};

// Update a module by ID
export const updateModule = async (module) => {
  return ModuleModel.findByIdAndUpdate(module._id, module, { new: true });
};
