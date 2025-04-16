import { v4 as uuidv4 } from "uuid";
import EnrollmentModel from "./model.js";

// Get all enrollments
export const findAllEnrollments = async () => {
  return EnrollmentModel.find();
};

// Enroll a user in a course
export const enrollUserInCourse = async (userId, courseId) => {
  const existing = await EnrollmentModel.findOne({ user: userId, course: courseId });
  if (existing) return existing;

  const newEnrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId,
  };

  return EnrollmentModel.create(newEnrollment);
};

// Unenroll a user from a course
export const unenrollUserFromCourse = async (userId, courseId) => {
  const result = await EnrollmentModel.deleteOne({ user: userId, course: courseId });
  return result.deletedCount > 0;
};

// Find all course IDs for a specific user
export const findCoursesForUser = async (userId) => {
  const enrollments = await EnrollmentModel.find({ user: userId });
  return enrollments.map((e) => e.course);
};
