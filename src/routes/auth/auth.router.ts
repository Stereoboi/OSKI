import { Router } from 'express';
import signInControllers from '../../controllers/signin.controller.js';
import { tryCatch } from '../../middleware/try-catch.middleware.js';

export const authRouter = Router();

authRouter.get('/google', tryCatch(signInControllers.authenticateWithGoogle.bind(signInControllers)));
authRouter.get('/google/callback', tryCatch(signInControllers.handleGoogleCallback.bind(signInControllers)));
authRouter.get('/logout', tryCatch(signInControllers.logOut.bind(signInControllers)));
