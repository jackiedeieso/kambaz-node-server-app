import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  // Get all modules for a course
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  });

  // Create a module for a course
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await dao.createModule(module);
    res.json(newModule);
  });

  // Delete a module
  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const result = await dao.deleteModule(moduleId);
    res.json(result);
  });

  // Update a module
  app.put("/api/modules/:moduleId", async (req, res) => {
    const updated = await dao.updateModule(req.body);
    res.json(updated);
  });
}
