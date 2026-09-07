import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { UPLOAD_DIR } from './constants/index.js';

const setupServer = express();

setupServer.use(express.json());
setupServer.use(cookieParser());
setupServer.use(cors());

setupServer.use(
  pino.pinoHttp({
    transport: { target: 'pino-pretty' },
  }),
);

setupServer.get('/', (req, res) => {
  res.json({ message: 'Contacts Sunucumuz Çalışıyor!' });
});
setupServer.use('/auth', authRouter);
setupServer.use('/contacts', contactsRouter);

setupServer.use(notFoundHandler);
setupServer.use(errorHandler);
setupServer.use('/uploads', express.static(UPLOAD_DIR));

export default setupServer;
