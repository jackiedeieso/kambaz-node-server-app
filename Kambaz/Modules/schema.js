import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    _id: String,
    name: { type: String, required: true },
    description: String,
    course: { type: String, required: true },
    lessons: [
      {
        _id: String,
        name: String,
        description: String,
        module: String,
      },
    ],
  },
  { collection: "modules" }
);

export default moduleSchema;
