import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 

// Route imports
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import QuizRoutes from "./Kambaz/Quizzes/routes.js";       
import AttemptRoutes from "./Kambaz/Attempts/routes.js";   

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING  || "mongodb://127.0.0.1:27017/kambaz";

import { setMaxListeners } from 'events';
setMaxListeners(20); 

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    console.log("📛 Using database:", mongoose.connection.name);
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const allowedOrigins = [
  "http://localhost:5173",
  "https://jackie-deieso-kambaz.netlify.app",
];

const app = express();
app.set("trust proxy", 1);

const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());

app.use(
  cors({
    origin: "https://jackie-deieso-kambaz.netlify.app", 
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    },
  })
);

// Route mounting 
UserRoutes(app);
CourseRoutes(app);
Lab5(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
QuizRoutes(app);
AttemptRoutes(app);

app.get("/", (req, res) => {
  res.send("Backend is alive!");
});

app.post("/api/users/profile", (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).send("Not logged in");
  }
  res.json(req.session.currentUser);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
