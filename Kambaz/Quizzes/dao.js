import QuizModel from './model.js';

export const createQuiz = (quiz) => QuizModel.create(quiz);

export const findQuizzesByCourse = (courseId) =>
  QuizModel.find({ courseId });

export const findQuizById = (quizId) =>
  QuizModel.findById(quizId);

export const updateQuiz = (quizId, updates) =>
  QuizModel.findByIdAndUpdate(quizId, updates, { new: true });

export const deleteQuiz = (quizId) =>
  QuizModel.findByIdAndDelete(quizId);

export const toggleQuizPublish = async (quizId) => {
  const quiz = await QuizModel.findById(quizId);
  quiz.published = !quiz.published;
  return quiz.save();
};

export const findQuizBySlug = async (courseId, slug) =>
    QuizModel.findOne({ courseId, slug });
  