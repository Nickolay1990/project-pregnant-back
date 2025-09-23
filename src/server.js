import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: 'https://project-pregnant.vercel.app', // твой фронт
      credentials: true, // разрешаем куки
    }),
  );
  app.use(cookieParser());

  app.use('/api-docs', swaggerDocs());
  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
