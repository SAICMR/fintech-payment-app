import express from 'express';
import { apiRouter } from './v1';

export const rootRouter = express.Router();

rootRouter.get('/ui', (req, res) => {
  res.status(200).send(`
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Payment App</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Arial, sans-serif; background: #f3f6fb; color: #1b2430; }
    .container { max-width: 1050px; margin: 24px auto; padding: 0 16px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .title { margin: 0; }
    .subtitle { margin: 4px 0 0; color: #5b6574; }
    .grid { display: grid; gap: 16px; grid-template-columns: 340px 1fr; }
    .card { background: #fff; border: 1px solid #dce3ec; border-radius: 12px; padding: 16px; }
    .card h2 { margin: 0 0 12px; font-size: 18px; }
    label { display: block; margin: 10px 0 6px; font-size: 14px; font-weight: 700; }
    input, select, textarea { width: 100%; padding: 10px; border: 1px solid #c6d2e1; border-radius: 8px; }
    textarea { min-height: 70px; resize: vertical; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    button { border: 0; border-radius: 8px; padding: 10px 12px; font-weight: 700; cursor: pointer; margin-top: 10px; }
    .btn-primary { background: #1d4ed8; color: #fff; }
    .btn-muted { background: #e8eef8; color: #1e3a8a; }
    .btn-danger { background: #fee2e2; color: #b91c1c; }
    .status { margin-top: 8px; font-size: 13px; color: #0f5132; }
    .error { color: #b42318; white-space: pre-wrap; }
    .info { margin-top: 8px; font-size: 12px; color: #5b6574; }
    .payments { display: grid; gap: 12px; }
    .payment { border: 1px solid #dce3ec; border-radius: 10px; padding: 12px; background: #fbfdff; }
    .payment-top { display: flex; justify-content: space-between; gap: 10px; align-items: center; }
    .badge { padding: 4px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
    .created { background: #e0f2fe; color: #0369a1; }
    .approved { background: #dcfce7; color: #166534; }
    .cancelled { background: #fee2e2; color: #991b1b; }
    .meta { margin-top: 8px; color: #5b6574; font-size: 13px; line-height: 1.5; }
    .actions { display: flex; gap: 8px; margin-top: 10px; }
    .top-actions { display: flex; gap: 8px; }
    .hidden { display: none; }
    @media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1 class="title">Payment App</h1>
        <p class="subtitle">Login, create payments, approve/cancel, and refresh live data.</p>
      </div>
      <div class="top-actions">
        <button id="refreshBtn" class="btn-muted">Refresh</button>
        <button id="logoutBtn" class="btn-danger">Logout</button>
      </div>
    </div>

    <div class="grid">
      <section class="card">
        <h2>Authenticate</h2>
        <label for="username">Username</label>
        <input id="username" value="pillos" placeholder="pillos" />
        <label for="password">Password</label>
        <input id="password" type="password" value="password" />
        <button id="loginBtn" class="btn-primary">Login</button>
        <div class="info">Auth status:</div>
        <div id="authStatus" class="status"></div>

        <hr />

        <h2>Create Payment</h2>
        <div class="row">
          <div>
            <label for="payeeId">Payee ID</label>
            <input id="payeeId" value="fc1941f3-7912-4b3d-8fdb-dcb9733aa994" />
          </div>
          <div>
            <label for="payerId">Payer ID</label>
            <input id="payerId" value="0499274e-9325-43b1-9cff-57c957e9a337" />
          </div>
        </div>
        <div class="row">
          <div>
            <label for="paymentSystem">Payment System</label>
            <input id="paymentSystem" value="ingenico" />
          </div>
          <div>
            <label for="paymentMethod">Payment Method</label>
            <input id="paymentMethod" value="mastercard" />
          </div>
        </div>
        <div class="row">
          <div>
            <label for="amount">Amount</label>
            <input id="amount" type="number" step="0.01" value="1250.50" />
          </div>
          <div>
            <label for="currency">Currency</label>
            <select id="currency">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>INR</option>
            </select>
          </div>
        </div>
        <label for="comment">Comment</label>
        <textarea id="comment">Invoice payment</textarea>
        <button id="createBtn" class="btn-primary">Create Payment</button>
        <div class="info">Create status:</div>
        <div id="createStatus" class="status"></div>
      </section>

      <section class="card">
        <h2>Payments</h2>
        <div class="info">List status:</div>
        <div id="listStatus" class="status"></div>
        <div id="payments" class="payments"></div>
      </section>
    </div>
  </div>

  <script>
    let authToken = localStorage.getItem('paymentAuthToken') || '';
    const authStatus = document.getElementById('authStatus');
    const createStatus = document.getElementById('createStatus');
    const listStatus = document.getElementById('listStatus');
    const paymentsNode = document.getElementById('payments');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const createBtn = document.getElementById('createBtn');

    function setMessage(node, text, isError) {
      node.textContent = text || '';
      node.className = isError ? 'status error' : 'status';
    }

    function setAuthUiState() {
      const loggedIn = !!authToken;
      createBtn.disabled = !loggedIn;
      refreshBtn.disabled = !loggedIn;
    }

    function getHeaders() {
      if (!authToken) return {};
      return { Authorization: 'Bearer ' + authToken };
    }

    async function api(path, options) {
      const response = await fetch(path, options);
      const bodyText = await response.text();
      let json = null;
      try {
        json = bodyText ? JSON.parse(bodyText) : null;
      } catch (e) {}
      if (!response.ok) {
        const detail = json ? JSON.stringify(json, null, 2) : bodyText;
        throw new Error('[' + response.status + '] ' + detail);
      }
      return json;
    }

    async function login() {
      setMessage(authStatus, 'Logging in...', false);
      try {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const tokenData = await api('/v1/authenticate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, password: password })
        });
        authToken = tokenData.authToken;
        localStorage.setItem('paymentAuthToken', authToken);
        setAuthUiState();
        setMessage(authStatus, 'Login successful. Token expires at: ' + tokenData.expiresIn, false);
        loadPayments();
      } catch (err) {
        setMessage(authStatus, err.message, true);
      }
    }

    function logout() {
      authToken = '';
      localStorage.removeItem('paymentAuthToken');
      setAuthUiState();
      setMessage(authStatus, 'Logged out', false);
      setMessage(createStatus, '', false);
      setMessage(listStatus, '', false);
      paymentsNode.innerHTML = '';
    }

    function paymentCard(payment) {
      const badgeClass = payment.status || 'created';
      const canApprove = payment.status !== 'approved' && payment.status !== 'cancelled';
      const canCancel = payment.status !== 'approved' && payment.status !== 'cancelled';
      return '<div class="payment">' +
        '<div class="payment-top">' +
          '<strong>' + payment.paymentMethod + ' · ' + payment.paymentSystem + '</strong>' +
          '<span class="badge ' + badgeClass + '">' + payment.status + '</span>' +
        '</div>' +
        '<div class="meta">' +
          'ID: ' + payment.id + '<br>' +
          'Amount: ' + payment.amount + ' ' + payment.currency + '<br>' +
          'Payer: ' + payment.payerId + '<br>' +
          'Payee: ' + payment.payeeId + '<br>' +
          'Comment: ' + (payment.comment || '-') + '<br>' +
          'Created: ' + payment.created +
        '</div>' +
        '<div class="actions">' +
          (canApprove ? '<button class="btn-muted" data-action="approve" data-id="' + payment.id + '">Approve</button>' : '') +
          (canCancel ? '<button class="btn-danger" data-action="cancel" data-id="' + payment.id + '">Cancel</button>' : '') +
        '</div>' +
      '</div>';
    }

    async function loadPayments() {
      if (!authToken) {
        setMessage(listStatus, 'Please login first.', true);
        return;
      }
      setMessage(listStatus, 'Loading payments...', false);
      try {
        const payments = await api('/v1/payments', { headers: getHeaders() });
        if (!payments.length) {
          paymentsNode.innerHTML = '<div class="meta">No payments yet.</div>';
        } else {
          paymentsNode.innerHTML = payments.map(paymentCard).join('');
        }
        setMessage(listStatus, 'Loaded ' + payments.length + ' payment(s).', false);
      } catch (err) {
        setMessage(listStatus, err.message, true);
      }
    }

    async function createPayment() {
      if (!authToken) {
        setMessage(createStatus, 'Please login first.', true);
        return;
      }
      setMessage(createStatus, 'Creating payment...', false);
      const payload = {
        payeeId: document.getElementById('payeeId').value.trim(),
        payerId: document.getElementById('payerId').value.trim(),
        paymentSystem: document.getElementById('paymentSystem').value.trim(),
        paymentMethod: document.getElementById('paymentMethod').value.trim(),
        amount: Number(document.getElementById('amount').value),
        currency: document.getElementById('currency').value.trim(),
        comment: document.getElementById('comment').value.trim()
      };
      try {
        const payment = await api('/v1/payments', {
          method: 'POST',
          headers: Object.assign({ 'Content-Type': 'application/json' }, getHeaders()),
          body: JSON.stringify(payload)
        });
        setMessage(createStatus, 'Payment created: ' + payment.id, false);
        loadPayments();
      } catch (err) {
        setMessage(createStatus, err.message, true);
      }
    }

    async function updatePaymentStatus(paymentId, action) {
      if (!authToken) return;
      setMessage(listStatus, 'Updating payment...', false);
      try {
        await api('/v1/payments/' + paymentId + '/' + action, {
          method: 'PUT',
          headers: getHeaders()
        });
        setMessage(listStatus, 'Payment ' + action + 'd successfully.', false);
        loadPayments();
      } catch (err) {
        setMessage(listStatus, err.message, true);
      }
    }

    paymentsNode.addEventListener('click', function (event) {
      const target = event.target;
      const id = target.getAttribute('data-id');
      const action = target.getAttribute('data-action');
      if (!id || !action) return;
      updatePaymentStatus(id, action);
    });

    loginBtn.addEventListener('click', login);
    logoutBtn.addEventListener('click', logout);
    refreshBtn.addEventListener('click', loadPayments);
    createBtn.addEventListener('click', createPayment);
    setAuthUiState();

    if (authToken) {
      setMessage(authStatus, 'Session restored. Click Refresh to load latest payments.', false);
      loadPayments();
    } else {
      setMessage(authStatus, 'Use demo users: pillos/password or angelos/password', false);
      setMessage(createStatus, 'Login required before creating payment.', true);
      setMessage(listStatus, 'Login required before listing payments.', true);
    }
  </script>
</body>
</html>
  `);
});

// Root route - API documentation
rootRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Payment Gateway API',
    version: '1.0.0',
    documentation: {
      authentication: 'POST /v1/authenticate',
      payments: 'GET /v1/payments'
    },
    description: 'OAuth2 Express REST API for payment gateway service'
  });
});

rootRouter.use('/v1', apiRouter);