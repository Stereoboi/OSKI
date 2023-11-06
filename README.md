## Project commands

`npm install` - to launch your project  
`npm run dev` - to run project in dev mode  
`npm run build`- build project

## Required features

**Test app - backend**;

- \_I have implemented an API for user testing. The project includes user authentication using Passport.js with Google OAuth and cookie session strategies. The routes are protected by an authentication middleware. After logging in, a user receives a list of available tests based on their status. The default status assigned upon registration is "starter," but to ensure that the logic works, you can change the plan to "pro," and you will receive a different list intended for other users.

- \_Additionally, I have implemented a route for fetching a test task by its ID to take the test. The "submit" route sends the user's answers to the backend, where they are checked and recorded. The route also includes logic to prevent users from retaking the test.
