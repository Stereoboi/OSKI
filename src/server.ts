import https from 'https';

import app from './config/express.js';

import { mongoConnect } from './config/mongo.js';

const PORT = process.env.PORT || 8000;

const server = https.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
