import AttemptModel from './model.js';

export const createAttempt = (attempt) => AttemptModel.create(attempt);

export const findAttemptsByQuizAndUser = (quizId, userId) =>
  AttemptModel.find({ quizId, userId });

export const findLastAttempt = async (quizId, userId) =>
  AttemptModel.findOne({ quizId, userId }).sort({ timestamp: -1 });

export const countAttempts = (quizId, userId) =>
    AttemptModel.countDocuments({ quizId, userId });