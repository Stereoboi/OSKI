import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export class SigInControllers {
  // constructor(){}

  async authenticateWithGoogle(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('google', {
      scope: ['email'],
    })(req, res, next);
  }

  async handleGoogleCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('google', {
      failureRedirect: '/failure',
      successRedirect: '/secret',
      session: true,
    })(req, res, next);
  }

  async logOut(req: Request, res: Response, next: NextFunction) {
    await req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }
}

const signInControllers = new SigInControllers();
export default signInControllers;
