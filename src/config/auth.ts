/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';

export const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

export const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID!,
  clientSecret: config.CLIENT_SECRET!,
  callbackURL: `${process.env.DEPLOY_URL}/auth/google/callback`,
};

export function verifyCallback(accessToken: any, refreshToken: any, profile: any, done: any) {
  console.log('Google profile verify cb');
  done(null, profile);
}
