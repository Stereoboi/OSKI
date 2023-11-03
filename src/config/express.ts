/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import cookieSession from 'cookie-session';
import 'dotenv/config';
import { api } from '../routes/api.js';
import { AUTH_OPTIONS, verifyCallback } from './auth.js';
import { checkLoggedIn } from '../middleware/auth.middleware.js';
import { isUserExist } from '../middleware/user-availability.middleware.js';
import ErrorHandler from '../middleware/error-handler.js';

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user: any, done) => {
  console.log('serializeUser', user);

  done(null, { id: user.id, email: user.emails[0].value });
});

passport.deserializeUser((user: any, done) => {
  isUserExist(user);
  console.log('deserializeUser', user);

  done(null, user);
});

const app = express();
app.use(helmet());

app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY!],
  }),
);

app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb: any) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb: any) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(morgan('combined'));

app.use(express.json());

app.use('/', api);

// app.get(
//   '/auth/google',
//   passport.authenticate('google', {
//     scope: ['email'],
//   }),
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/failure',
//     successRedirect: '/secret',
//     session: true,
//   }),
//   (req: Request, res: Response) => {
//     console.log('Google called us back!');
//   },
// );

// app.get('/logout', async (req, res, next) => {
//   await req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });

app.get('/secret', checkLoggedIn, (req, res) => {
  return res.send('Your personal secret value is 42!');
});

app.get('/failure', (req, res) => {
  return res.send('Failed to log in!');
});

app.use(ErrorHandler);

export default app;