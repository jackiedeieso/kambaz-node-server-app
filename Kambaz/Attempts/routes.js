import express from 'express';
import {
  createAttempt,
  findLastAttempt,
  countAttempts,
} from './dao.js';
import QuizModel from '../Quizzes/model.js';

const AttemptRoutes = (app) => {
  const router = express.Router();

  router.post('/api/attempts/:quizId/submit', async (req, res) => {
    const { quizId } = req.params;
    const { userId, answers } = req.body;

    const quiz = await QuizModel.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const attemptCount = await countAttempts(quizId, userId);
    if (
      (!quiz.settings.multipleAttempts && attemptCount >= 1) ||
      (quiz.settings.multipleAttempts && attemptCount >= quiz.settings.maxAttempts)
    ) {
      return res.status(403).json({ error: 'Maximum attempts reached' });
    }

    let score = 0;
    const gradedAnswers = answers.map((ans) => {
      const q = quiz.questions.id(ans.questionId);
      let correct = false;

      if (!q) return { ...ans, correct: false };

      if (q.type === 'multiple_choice') {
        correct = q.choices.find((c) => c.text === ans.answer)?.correct || false;
      } else if (q.type === 'true_false') {
        correct = q.correct === (ans.answer === 'true' || ans.answer === true);
      } else if (q.type === 'fill_blank') {
        correct = q.correctAnswers.some(
          (a) => a.trim().toLowerCase() === ans.answer.trim().toLowerCase()
        );
      }

      if (correct) score += q.points;
      return { ...ans, correct };
    });

    const newAttempt = await createAttempt({
      quizId,
      userId,
      attemptNumber: attemptCount + 1,
      score,
      answers: gradedAnswers,
    });

    res.json({ score, attempt: newAttempt });
  });

  router.get('/api/attempts/:quizId/user/:userId', async (req, res) => {
    const attempt = await findLastAttempt(req.params.quizId, req.params.userId);
    if (!attempt) return res.status(404).json({ error: 'No attempts found' });
    res.json(attempt);
  });

  app.use(router);
};

export default AttemptRoutes;
