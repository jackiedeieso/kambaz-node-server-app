import { v4 as uuidv4 } from "uuid";
import AssignmentModel from "./model.js";

// Get all assignments (for admin/testing)
export const findAllAssignments = async () => {
  return AssignmentModel.find();
};

// Get one assignment by ID
export const findAssignmentById = async (assignmentId) => {
  return AssignmentModel.findById(assignmentId);
};

// Get all assignments for a specific course
export const findAssignmentsForCourse = async (courseId) => {
  return AssignmentModel.find({ course: courseId });
};

// Create a new assignment
export const createAssignment = async (assignment) => {
  const newAssignment = {
    _id: uuidv4(),
    title: assignment.title,
    description: assignment.description,
    points: assignment.points,
    due: assignment.due,
    available: assignment.available || null,
    availableUntil: assignment.availableUntil || null,
    course: assignment.course,
  };

  return AssignmentModel.create(newAssignment);
};

// Update an existing assignment
export const updateAssignment = async (assignmentId, updates) => {
  return AssignmentModel.findByIdAndUpdate(assignmentId, updates, { new: true });
};

// Delete an assignment
export const deleteAssignment = async (assignmentId) => {
  const result = await AssignmentModel.deleteOne({ _id: assignmentId });
  return result.deletedCount > 0;
};
