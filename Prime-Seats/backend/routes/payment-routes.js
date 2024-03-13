
import { checkStatus, newPayment } from '../controllers/payment-controllers.js';
import express from 'express';

const paymentRouter = express();

paymentRouter.post('/payment', newPayment);
paymentRouter.post('/status/:txnId', checkStatus);

export default paymentRouter;
