import express from 'express';
import { taskRouter } from './tasks/task.router.js';

export const api = express.Router();

api.use('/tests', taskRouter);
