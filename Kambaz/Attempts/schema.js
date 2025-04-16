import mongoose from 'mongoose';

export const AnswerSchema = new mongoose.Schema({
  questionId: mongoose.Schema.Types.ObjectId,
  answer: String, // text, 'true', or a fill-in answer
  correct: Boolean,
});

export const AttemptSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  attemptNumber: Number,
  score: Number,
  answers: [AnswerSchema],
});
