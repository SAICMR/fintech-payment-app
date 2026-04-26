import express from 'express';
import { authService } from '../../services';

export const authRouter = express.Router();

authRouter.all('/', authService.generateTokenClassic);
authRouter.all('/oauth/token', authService.generateTokenOAuth2);