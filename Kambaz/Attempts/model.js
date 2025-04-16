import mongoose from 'mongoose';
import { AttemptSchema } from './schema.js';

const AttemptModel = mongoose.model('Attempt', AttemptSchema);
export default AttemptModel;
