import express from 'express';
import { getTransactionPool, addTransaction } from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.route('/transactions')
    .get(getTransactionPool)
   
router.route('/transaction')
    .post(addTransaction)

    
export default router