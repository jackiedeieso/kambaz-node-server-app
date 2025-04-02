import PathParameters from "./PathParameters.js";

let assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

let module = {
  id: "MOD456",
  name: "Advanced React",
  description: "State management, routing, and hooks",
  course: "CS7890",
};

export default function Lab5(app) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });

  PathParameters(app);

  app.get("/lab5/assignment", (req, res) => res.json(assignment));
  app.get("/lab5/assignment/title", (req, res) => res.send(assignment.title));
  app.put("/lab5/assignment/title/:title", (req, res) => {
    assignment.title = req.params.title;
    res.send(`Title updated to ${assignment.title}`);
  });
  app.put("/lab5/assignment/score/:score", (req, res) => {
    assignment.score = parseInt(req.params.score);
    res.send(`Score updated to ${assignment.score}`);
  });
  app.put("/lab5/assignment/completed/:completed", (req, res) => {
    assignment.completed = req.params.completed === "true";
    res.send(`Completed status updated to ${assignment.completed}`);
  });

  // Module Routes
  app.get("/lab5/module", (req, res) => res.json(module));
  app.get("/lab5/module/name", (req, res) => res.send(module.name));
  app.put("/lab5/module/name/:name", (req, res) => {
    module.name = req.params.name;
    res.send(`Module name updated to ${module.name}`);
  });
  app.put("/lab5/module/description/:description", (req, res) => {
    module.description = req.params.description;
    res.send(`Module description updated to ${module.description}`);
  });
}
