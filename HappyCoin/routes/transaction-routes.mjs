import express from 'express';
import {
    getTransactionPool,
    addTransaction,
    mineTransactions,
} from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.route('/transactions')
    .get(getTransactionPool)

router.route('/transaction')
    .post(addTransaction)

router.route('/mine')
    .get(mineTransactions)


export default router