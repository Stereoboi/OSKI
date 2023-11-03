import express from 'express';
import { taskRouter } from './tasks/task.router.js';
import { authRouter } from './auth/auth.router.js';
export const api = express.Router();

api.use('/tests', taskRouter);
api.use('/auth', authRouter);
