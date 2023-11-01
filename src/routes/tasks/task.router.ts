import express from 'express';

import { httpGetAllTasks } from '../../controllers/task.controller.js';

export const taskRouter = express.Router();

taskRouter.get('/', httpGetAllTasks);
