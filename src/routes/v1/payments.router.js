import express from 'express';
import { authService, paymentsService } from '../../services';

export const paymentsRouter = express.Router();

paymentsRouter.get('/', authService.authenticateToken, paymentsService.list);
paymentsRouter.post('/', authService.authenticateToken, paymentsService.create);
paymentsRouter.get('/:id', authService.authenticateToken, paymentsService.get);
paymentsRouter.put('/:id/approve', authService.authenticateToken, paymentsService.approve);
paymentsRouter.put('/:id/cancel', authService.authenticateToken, paymentsService.cancel);