import express from 'express';
import {
  createQuiz,
  findQuizzesByCourse,
  findQuizById,
  findQuizBySlug,
  updateQuiz,
  deleteQuiz,
  toggleQuizPublish,
} from './dao.js';

const QuizRoutes = (app) => {
  const router = express.Router();

  // Get all quizzes for a course
  router.get('/api/quizzes/course/:courseId', async (req, res) => {
    const quizzes = await findQuizzesByCourse(req.params.courseId);
    res.json(quizzes);
  });

  // Get a quiz by its ObjectId
  router.get('/api/quizzes/:quizId', async (req, res) => {
    const quiz = await findQuizById(req.params.quizId);
    res.json(quiz);
  });

  // Get quiz by slug + courseId
  router.get('/api/courses/:courseId/quizzes/:slug', async (req, res) => {
    const quiz = await findQuizBySlug(req.params.courseId, req.params.slug);
    if (!quiz) return res.sendStatus(404);
    res.json(quiz);
  });

  // Create a new quiz
  router.post('/api/quizzes', async (req, res) => {
    const quiz = await createQuiz(req.body);
    res.json(quiz);
  });

  // Update quiz by ID
  router.put('/api/quizzes/:quizId', async (req, res) => {
    const quiz = await updateQuiz(req.params.quizId, req.body);
    res.json(quiz);
  });

  // Delete quiz
  router.delete('/api/quizzes/:quizId', async (req, res) => {
    await deleteQuiz(req.params.quizId);
    res.sendStatus(200);
  });

  // Toggle publish status
  router.patch('/api/quizzes/:quizId/publish', async (req, res) => {
    const quiz = await toggleQuizPublish(req.params.quizId);
    res.json(quiz);
  });

  app.use(router);
};

export default QuizRoutes;
