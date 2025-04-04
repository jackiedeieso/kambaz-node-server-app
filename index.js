import express from 'express';
import cors from 'cors';
import session from 'express-session';
import "dotenv/config.js";

// Route imports
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

const app = express();

app.set("trust proxy", 1);

const netlifyOrigin = "https://jackie-deieso-kambaz.netlify.app";
app.use(cors({
  origin: netlifyOrigin,
  credentials: true,
}));

app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  proxy: true, 
  cookie: {
    sameSite: "none", 
    secure: true     
  }
};

app.use(session(sessionOptions));

UserRoutes(app);
CourseRoutes(app);
Lab5(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

app.get("/", (req, res) => {
  res.send("Backend is alive!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
