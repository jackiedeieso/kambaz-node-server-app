import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  app.get("/api/dev/users", async (req, res) => {
    const users = await dao.findAllUsers();
    console.log("🧾 All users in DB:", users);
    res.json(users);
  });
  // Dev Login
  app.post("/api/users/devlogin", (req, res) => {
    const adminUser = {
      _id: "123456",
      username: "admin",
      role: "FACULTY",
      firstName: "Dev",
      lastName: "User",
    };
    req.session["currentUser"] = adminUser;
    res.json(adminUser);
  });

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;

    if (role && name) {
      const users = await dao.findUsersByRoleAndName(role, name);
      return res.json(users);
    }

    if (role) {
      const users = await dao.findUsersByRole(role);
      return res.json(users);
    }

    if (name) {
      const users = await dao.findUsersByPartialName(name);
      return res.json(users);
    }

    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const { userId } = req.params;
    const user = await dao.findUserById(userId);
    user ? res.json(user) : res.sendStatus(404);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json({ ...userUpdates, _id: userId });
  };
  app.put("/api/users/:userId", updateUser);

  const signup = async (req, res) => {
    const existingUser = await dao.findUserByUsername(req.body.username);
    if (existingUser) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const newUser = await dao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    console.log("🧪 Login attempt received:", { username, password });
  
    try {
      const user = await dao.findUserByUsername(username);
      console.log("🕵️ Found user:", user);
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      req.session.currentUser = user;
      req.session.save(() => {
        console.log("✅ Session saved:", req.session);
        res.json(user);
      });
    } catch (err) {
      console.error("🔥 Signin error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    currentUser ? res.json(currentUser) : res.sendStatus(401);
  };

  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
  
    console.log("📩 Incoming request to /api/users/current/courses");
    console.log("🧠 Session object:", req.session);
    console.log("👤 Session user:", req.session?.currentUser);
  
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
  
      if (!currentUser) {
        console.warn("⚠️ No user found in session.");
        res.sendStatus(401);
        return;
      }
  
      userId = currentUser._id;
    }
  
    const courses = await courseDao.findCoursesForEnrolledUser(userId);
    console.log("📚 Courses found:", courses);
    res.json(courses);
  };
  

  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = await courseDao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  // Route registrations
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);

  console.log("✅ User routes loaded");
}

