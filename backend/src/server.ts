import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import authRouter from './modules/auth/auth.routes';

dotenv.config();

const app = express();
app.use(cors());
const PORT: string | number = process.env.PORT || 4000;

app.use(express.json());
app.use(errorHandler);

app.get('/', (_: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});