import * as dao from "./dao.js";
import db from "../Database/index.js";

export default function EnrollmentRoutes(app) {

  app.post("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required." });
    }

    const enrollment = await dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  });

  app.delete("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required." });
    }

    const result = await dao.unenrollUserFromCourse(userId, courseId);
    if (result) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: "Enrollment not found." });
    }
  });

  app.get("/api/enrollments/users/:userId/courses", async (req, res) => {
    const { userId } = req.params;
    const courseIds = await dao.findCoursesForUser(userId);
    const allCourses = await Promise.all(
      courseIds.map((id) => courseDao.findCourseById(id))
    );
    res.json(allCourses.filter(Boolean)); // Filter out any not found
  });

  app.get("/api/enrollments", async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  });
}
