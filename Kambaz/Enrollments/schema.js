// Kambaz/Enrollments/schema.js
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    _id: String, 
    user: { type: String, required: true },
    course: { type: String, required: true },
  },
  { collection: "enrollments" }
);

export default enrollmentSchema;
