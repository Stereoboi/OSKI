// import http from 'http';

import app from './config/express.js';

import { mongoConnect } from './config/mongo.js';

const PORT = process.env.PORT || 8000;

// const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
