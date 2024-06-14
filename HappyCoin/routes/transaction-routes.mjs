import express from 'express';
import {
    getTransactionPool,
    addTransaction,
    mineTransactions,
    getWalletBalance,
} from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.route('/transactions')
    .get(getTransactionPool)

router.route('/transaction')
    .post(addTransaction)

router.route('/mine')
    .get(mineTransactions)

router.route('/balance')  
    .get(getWalletBalance)  


export default router