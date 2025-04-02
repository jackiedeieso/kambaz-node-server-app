import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.post("/api/assignments", async (req, res) => {
    const newAssignment = await dao.createAssignment(req.body);
    res.json(newAssignment);
  });

  app.get("/api/assignments", async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  });

  app.get("/api/assignments/:aid", async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.aid);
    if (assignment) res.json(assignment);
    else res.sendStatus(404);
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    const updated = await dao.updateAssignment(req.params.aid, req.body);
    res.json(updated);
  });

  app.delete("/api/assignments/:aid", async (req, res) => {
    await dao.deleteAssignment(req.params.aid);
    res.sendStatus(204);
  });
}
