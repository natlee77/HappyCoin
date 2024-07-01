import express from 'express';
import {protect, authorize} from '../middleware/authorization.mjs';
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
    .post(protect, authorize('user', 'admin'), addTransaction)

router.route('/mine')
    .get(protect, authorize('miner', 'admin') , mineTransactions)

router.route('/balance')  
    .get( protect,authorize('user', 'admin', 'miner'), getWalletBalance)  


export default router