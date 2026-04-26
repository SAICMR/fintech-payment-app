import { ValidationError } from '../utils';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

var repository = {
  payments: [
    {
      userId: 'angelos',
      payeeId: 'fc1941f3-7912-4b3d-8fdb-dcb9733aa994',
      payerId: '0499274e-9325-43b1-9cff-57c957e9a337',
      paymentSystem: 'ingenico',
      paymentMethod: 'mastercard',
      amount: 100500.42,
      currency: 'USD',
      comment: 'Salary for March',
      id: 'eea41f99-cd4c-4a9d-b704-c2dbd3be8868',
      status: 'created',
      created: '2019-07-27T09:48:43+03:00',
      updated: '2019-07-27T09:48:43+03:00'
    },
    {
      userId: 'angelos',
      payeeId: 'fc1941f3-7912-4b3d-8fdb-dcb9733aa994',
      payerId: '0499274e-9325-43b1-9cff-57c957e9a337',
      paymentSystem: 'ingenico',
      paymentMethod: 'mastercard',
      amount: 100500.42,
      currency: 'USD',
      comment: 'Salary for March',
      id: 'd6154af5-759a-4af3-bed2-915cbafeff32',
      status: 'created',
      created: '2019-07-27T09:48:43+03:00',
      updated: '2019-07-27T09:48:43+03:00'
    },
    {
      userId: 'pillos',
      payeeId: 'fc1941f3-7912-4b3d-8fdb-dcb9733aa994',
      payerId: '0499274e-9325-43b1-9cff-57c957e9a337',
      paymentSystem: 'ingenico',
      paymentMethod: 'mastercard',
      amount: 100500.42,
      currency: 'USD',
      comment: 'Salary for March',
      id: '0c77e7b6-072e-4861-950a-772c69512648',
      status: 'created',
      created: '2019-07-27T09:48:43+03:00',
      updated: '2019-07-27T09:48:43+03:00'
    },
    {
      userId: 'pillos',
      payeeId: 'fc1941f3-7912-4b3d-8fdb-dcb9733aa994',
      payerId: '0499274e-9325-43b1-9cff-57c957e9a337',
      paymentSystem: 'ingenico',
      paymentMethod: 'mastercard',
      amount: 100500.42,
      currency: 'USD',
      comment: 'Salary for March',
      id: 'b90c73cf-177a-48d6-abcd-9df1b9ad262d',
      status: 'created',
      created: '2019-07-27T09:48:43+03:00',
      updated: '2019-07-27T09:48:43+03:00'
    }]
};

function list(userId) {
  var payments = repository.payments.filter(function (savedPayment) {
    return savedPayment.userId === userId;
  });
  const result = JSON.parse(JSON.stringify(payments));
  return result ? Promise.resolve(result) : Promise.reject(new ValidationError());
}

function get(userId, paymentId) {
  var payments = repository.payments.filter(function (savedPayment) {
    return (savedPayment.userId === userId && savedPayment.id === paymentId);
  });
  const result = JSON.parse(JSON.stringify(payments));
  return result[0] ? Promise.resolve(result[0]) : Promise.reject(new ValidationError());
}

function updateStatus(status, payment) {
  repository.payments = repository.payments.filter(function (savedPayment) {
    return (savedPayment.id != payment.id);
  });
  payment.updated = moment().format();
  payment.status = status;
  const result = JSON.parse(JSON.stringify(payment));
  return repository.payments.push(payment) ? Promise.resolve(result) : Promise.reject(new ValidationError());
}

function create(userId, payment) {
  var savePayment = payment;
  savePayment.id = uuidv4();
  savePayment.status = "created";
  savePayment.created = moment().format();;
  savePayment.updated = moment().format();;
  const result = JSON.parse(JSON.stringify(savePayment));
  savePayment.userId = userId;
  return repository.payments.push(savePayment) ? Promise.resolve(result) : Promise.reject(new ValidationError());
}

export const paymentsRepository = {
  list,
  get,
  updateStatus,
  create
};