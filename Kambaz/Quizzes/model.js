import mongoose from 'mongoose';
import { QuizSchema } from './schema.js';

const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz;
