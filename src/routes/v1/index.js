import express from 'express';
import { authRouter } from './auth.router';
import { paymentsRouter } from './payments.router';

export const apiRouter = express.Router();

apiRouter.use('/authenticate', authRouter);
apiRouter.use('/payments', paymentsRouter);