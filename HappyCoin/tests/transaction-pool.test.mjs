import{ it, describe, expect, beforeEach } from 'vitest';
import Transaction from '../models/Transaction.mjs';
import TransactionPool from '../models/TransactionPool.mjs';
import Wallet from '../models/Wallet.mjs';
 

describe('TransactionPool', () => {
    // sender === wallet
    let transactionPool, transaction, senderWallet;
    senderWallet = new Wallet();

    beforeEach(() => {   
        transaction = new Transaction({
            sender: senderWallet,
            recipient: 'recipient-address 0x0000000000',
            amount: 150,
        });
        transactionPool = new TransactionPool();
    });
    //_______________________________________
    describe('properties', () => {
        //if property name changed
        it('should have a transactionMap', () => {
            expect(transactionPool).toHaveProperty('transactionMap');
        });
        
    })
   //_______________________________________ 
   describe('add  a transaction', () => {
    it('should add a transaction to the pool', () => {
        transactionPool.addTransaction(transaction);      

        expect(transactionPool.transactionMap[transaction.id]).toBe(transaction);
    });


   describe('existing transaction', () => {
    it('should return   transaction based on an address', () => { 
        //transactionExist()
        transactionPool.addTransaction(transaction);
        
        expect(transactionPool.transactionExist({ address: senderWallet.publicKey })).toBe(transaction);
    });


    })
    })





})  

