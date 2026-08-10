import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRouter from './routers/contacts.js';

const setupServer = express();

setupServer.use(express.json());
setupServer.use(cors());

setupServer.use(
  pino.pinoHttp({
    transport: { target: 'pino-pretty' },
  }),
);

setupServer.get('/', (req, res) => {
  res.json({ message: 'Contacts Sunucumuz Çalışıyor!' });
});

setupServer.use(contactsRouter);

setupServer.use(notFoundHandler);
setupServer.use(errorHandler);

// app nesnesini dışarı aktarıyoruz
export default setupServer;
