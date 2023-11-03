import { Router } from 'express';
import signInControllers from '../../controllers/signin.controller.js';
import { tryCatch } from '../../middleware/try-catch.middleware.js';

export const authRouter = Router();

// authRouter.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: ['email'],
//   }),
// );

// authRouter.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/failure',
//     successRedirect: '/secret',
//     session: true,
//   }),
// );
authRouter.get('/google', tryCatch(signInControllers.authenticateWithGoogle.bind(signInControllers)));
authRouter.get('/google/callback', tryCatch(signInControllers.handleGoogleCallback.bind(signInControllers)));
authRouter.get('/logout', tryCatch(signInControllers.logOut.bind(signInControllers)));
