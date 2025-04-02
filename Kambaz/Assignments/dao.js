import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findAllAssignments = async () => {
  return db.assignments;
};

export const findAssignmentById = async (assignmentId) => {
  return db.assignments.find((a) => a._id === assignmentId);
};

export const findAssignmentsForCourse = async (courseId) => {
  return db.assignments.filter((a) => a.course === courseId);
};

export const createAssignment = async (assignment) => {
  const newAssignment = {
    _id: uuidv4(),
    name: assignment.name,
    description: assignment.description,
    dueDate: assignment.dueDate,
    points: assignment.points,
    availableFrom: assignment.availableFrom || "",
    availableUntil: assignment.availableUntil || "",
    course: assignment.course,
  };
  db.assignments.push(newAssignment);
  return newAssignment;
};

export const updateAssignment = async (assignmentId, updates) => {
  const index = db.assignments.findIndex((a) => a._id === assignmentId);
  if (index !== -1) {
    db.assignments[index] = { ...db.assignments[index], ...updates };
    return db.assignments[index];
  }
  return null;
};

export const deleteAssignment = async (assignmentId) => {
  const index = db.assignments.findIndex((a) => a._id === assignmentId);
  if (index !== -1) {
    db.assignments.splice(index, 1);
    return true;
  }
  return false;
};
