import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.post("/api/assignments", (req, res) => {
    const newAssignment = dao.createAssignment(req.body);
    res.json(newAssignment);
  });

  app.get("/api/assignments", (req, res) => {
    const assignments = dao.findAllAssignments();
    res.json(assignments);
  });

  app.get("/api/assignments/:aid", (req, res) => {
    const assignment = dao.findAssignmentById(req.params.aid);
    if (assignment) res.json(assignment);
    else res.sendStatus(404);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const updated = dao.updateAssignment(req.params.aid, req.body);
    res.json(updated);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    dao.deleteAssignment(req.params.aid);
    res.sendStatus(204);
  });
}
