import { CannotApproveError, ValidationError, CannotCancelError } from '../utils';
import { paymentsRepository } from '../repositories';

async function list(req, res, next) {
  var userId = res.locals.token.user.id;
  try {
    const payments = await paymentsRepository.list(userId);
    for (let i = 0; i < payments.length; i++) {
      delete payments[i].userId;
    }
    res.json(payments);
  }
  catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  var payment = req.body;
  var userId = res.locals.token.user.id;
  try {
    const payment_1 = await paymentsRepository.create(userId, payment);
    res.status(201).json(payment_1);
  }
  catch (err) {
    next(err);
  }
}

async function approve(req, res, next) {
  var userId = res.locals.token.user.id;
  var paymentId = req.params.id;
  try {
    const payment = await paymentsRepository.get(userId, paymentId);
    if (payment.status === "cancelled") {
      throw new CannotApproveError();
    }
    try {
      const payment_1 = await paymentsRepository.updateStatus("approved", payment);
      res.status(200).json();
    }
    catch (err) {
      next(err);
    }
  }
  catch (err_1) {
    next(err_1);
  }
}

async function cancel(req, res, next) {
  var userId = res.locals.token.user.id;
  var paymentId = req.params.id;
  try {
    const payment = await paymentsRepository.get(userId, paymentId);
    if (payment.status === "approved") {
      throw new CannotCancelError();
    }
    try {
      const payment_1 = await paymentsRepository.updateStatus("cancelled", payment);
      res.status(200).json();
    }
    catch (err) {
      next(err);
    }
  }
  catch (err_1) {
    next(err_1);
  }
}

async function get(req, res, next) {
  var userId = res.locals.token.user.id;
  var paymentId = req.params.id;
  try {
    const payment = await paymentsRepository.get(userId, paymentId);
    delete payment.userId;
    res.json(payment);
  }
  catch (err) {
    next(err);
  }
}

export const paymentsService = {
  list,
  create,
  approve,
  cancel,
  get
};