import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
  return Database.courses;
}

export const createCourse = (course) => {
  const newCourse = { ...course, _id: uuidv4() };
  Database.courses.push(newCourse);
  return newCourse;
};

export function deleteCourse(courseId) {
    const { courses, enrollments } = Database;
    Database.courses = courses.filter((course) => course._id !== courseId);
    Database.enrollments = enrollments.filter(
      (enrollment) => enrollment.course !== courseId
  );}

  export const updateCourse = (courseId, updates) => {
    const index = Database.courses.findIndex((c) => c._id === courseId);
    if (index === -1) return null;
  
    Database.courses[index] = { ...Database.courses[index], ...updates };
    return Database.courses[index];
  };

    export const findCoursesForEnrolledUser = (userId) => {
      const { courses, enrollments } = Database;
      const enrolledCourseIds = enrollments
        .filter((e) => e.user === userId)
        .map((e) => e.course);
      const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c._id));
      return enrolledCourses;
    };

    export const findCourseById = (id) =>
      Database.courses.find((course) => course._id === id);
  
  