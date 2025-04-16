import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Create an assignment for a specific course
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await dao.createAssignment(assignment);
    res.json(newAssignment);
  });

  // Get all assignments (admin/testing)
  app.get("/api/assignments", async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  });

  // Get all assignments for a course
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // Get a single assignment by ID
  app.get("/api/assignments/:aid", async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.aid);
    if (assignment) res.json(assignment);
    else res.sendStatus(404);
  });

  // Update an assignment
  app.put("/api/assignments/:aid", async (req, res) => {
    const updated = await dao.updateAssignment(req.params.aid, req.body);
    res.json(updated);
  });

  // Delete an assignment
  app.delete("/api/assignments/:aid", async (req, res) => {
    const success = await dao.deleteAssignment(req.params.aid);
    if (success) res.sendStatus(204);
    else res.status(404).json({ message: "Assignment not found." });
  });
}
