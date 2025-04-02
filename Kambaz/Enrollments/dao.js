import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findAllEnrollments = async () => {
  return Database.enrollments;
};

export const enrollUserInCourse = async (userId, courseId) => {
  const { enrollments } = Database;

  const existing = enrollments.find((e) => e.user === userId && e.course === courseId);
  if (existing) return existing;

  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
};

export const unenrollUserFromCourse = async (userId, courseId) => {
  const { enrollments } = Database;
  const index = enrollments.findIndex((e) => e.user === userId && e.course === courseId);
  if (index !== -1) {
    enrollments.splice(index, 1);
    return true;
  }
  return false;
};

export const findCoursesForUser = async (userId) => {
  const { enrollments } = Database;
  return enrollments
    .filter((e) => e.user === userId)
    .map((e) => e.course);
};
