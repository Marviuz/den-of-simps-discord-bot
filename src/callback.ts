import express from 'express';
import { env } from './env';
import log from './utils/logger';

const server = express();

server.get('/callback', (req, res) => {
  log.info('Timeout');
  res.json({ message: 'Hello world!' });
});

server.listen(env.PORT, () => log.info(`Listening ${env.PORT}`));
