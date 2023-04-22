import express from 'express';
import log from './utils/logger';

const server = express();

server.get('/callback', (req, res) => {
  res.json({ message: 'Hello world!' });
});

server.listen(process.env.PORT, () =>
  log.info(`Listening ${process.env.PORT}`)
);
