let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

export default function WorkingWithArrays(app) {
  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const filteredTodos = todos.filter((t) => t.completed === completedBool);
      res.json(filteredTodos);
    } else {
      res.json(todos);
    }
  });

  app.get("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo ? res.json(todo) : res.status(404).send("Todo not found");
  });

  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  app.post("/lab5/todos", (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  });

  app.get("/lab5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
      res.status(404).send("Todo not found");
    } else {
      todos.splice(index, 1);
      res.json(todos);
    }
  });

  app.delete("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
    } else {
      todos.splice(index, 1);
      res.sendStatus(200);
    }
  });

  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
      res.json(todos);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  app.put("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === "true";
      res.send(`Completed status updated for Todo ID = ${id}`);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  app.put("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
      res.send(`Description updated for Todo ID = ${id}`);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  app.put("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
    } else {
      todos[index] = { ...todos[index], ...req.body };
      res.json(todos[index]); // ✅ return updated todo instead of 200
    }
  });
  
}
