import { v4 as uuidv4 } from "uuid";
import CourseModel from "./model.js";
import EnrollmentModel from "../Enrollments/model.js"; // adjust path if needed

// Find all courses
export const findAllCourses = () => CourseModel.find();

// Create a new course
export const createCourse = async (course) => {
  const newCourse = { ...course, _id: uuidv4() };
  return CourseModel.create(newCourse);
};

// Delete a course and clean up enrollments
export const deleteCourse = async (courseId) => {
  await EnrollmentModel.deleteMany({ course: courseId });
  return CourseModel.deleteOne({ _id: courseId });
};

// Update course by ID
export const updateCourse = async (courseId, updates) => {
  return CourseModel.findByIdAndUpdate(courseId, updates, { new: true });
};

// Find all courses a user is enrolled in
export const findCoursesForEnrolledUser = async (userId) => {
  const enrollments = await EnrollmentModel.find({ user: userId });
  const courseIds = enrollments.map((e) => e.course);
  return CourseModel.find({ _id: { $in: courseIds } });
};

// Find single course by ID
export const findCourseById = (id) => CourseModel.findById(id);
