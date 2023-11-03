import { Router } from 'express';
import { tryCatch } from '../../middleware/try-catch.middleware.js';
import { checkLoggedIn } from '../../middleware/auth.middleware.js';
import taskController from '../../controllers/task.controller.js';
import { bodySchemaValidation } from '../../utils/validation.js';
import { bodyValidation } from '../../middleware/validation.middleware.js';

export const taskRouter = Router();

taskRouter.get('/', checkLoggedIn, tryCatch(taskController.httpGetAllTasks.bind(taskController)));
taskRouter.get('/:id', checkLoggedIn, tryCatch(taskController.httpGetTaskById.bind(taskController)));
taskRouter.post(
  '/submit',
  checkLoggedIn,
  bodyValidation(bodySchemaValidation),
  tryCatch(taskController.httpSubmitTest.bind(taskController)),
);
