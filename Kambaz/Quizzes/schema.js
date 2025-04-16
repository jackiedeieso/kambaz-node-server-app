import mongoose from 'mongoose';

export const QuizSchema = new mongoose.Schema({
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    courseId: { type: String, ref: 'Course' },
    title: { type: String, default: 'New Quiz' },
    description: String,
    published: { type: Boolean, default: false },
    availability: {
      availableDate: Date,
      untilDate: Date,
      dueDate: Date,
    },
    settings: {
      quizType: { type: String, default: 'Graded Quiz' },
      assignmentGroup: { type: String, default: 'Quizzes' },
      timeLimit: { type: Number, default: 20 },
      multipleAttempts: { type: Boolean, default: false },
      maxAttempts: { type: Number, default: 1 },
      showCorrectAnswers: { type: Boolean, default: true },
      accessCode: String,
      oneQuestionAtATime: { type: Boolean, default: false },
      webcamRequired: { type: Boolean, default: false },
      lockQuestions: { type: Boolean, default: false },
    },
    questions: [
        {
          title: String,
          prompt: String,
          type: { type: String, enum: ["multiple_choice", "true_false", "fill_blank"] },
          choices: [
            {
              text: String,
              correct: Boolean,
            },
          ],
          correct: Boolean, // for true_false
          correctAnswers: [String], // for fill_blank
        },
      ],
  });