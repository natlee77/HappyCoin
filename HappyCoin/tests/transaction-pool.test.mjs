import{ it, describe, expect, beforeEach } from 'vitest';
import Transaction from '../models/Transaction.mjs';
import TransactionPool from '../models/TransactionPool.mjs';
import Wallet from '../models/Wallet.mjs';
import Blockchain from '../models/Blockchain.mjs'; 

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

//____________________ ________________________
   describe('existing transaction', () => {
    it('should return   transaction based on an address', () => { 
        //transactionExist()
        transactionPool.addTransaction(transaction);
        
        expect(transactionPool.transactionExist({ address: senderWallet.publicKey })).toBe(transaction);
    });


    })
    })
//____________________ ________________________
    describe('validetTransaction', () => {
        //variables
        let transactions ;

        beforeEach(() => {             
            transactions = [];
            for (let i = 0; i < 10; i++) {
                transaction = new Transaction({
                    sender: senderWallet,
                    recipient: 'NATALIYA 0x0000000000',
                    amount: 50,
                });
                // mocka transactions
                if (i % 3 === 0) {
                    transaction.inputMap.amount = 1010; //saldo 1000
                } else if (i % 3 === 1) {
                    transaction.inputMap.signature = new Wallet().sign('badd');
                } else {
                    transactions.push(transaction);
                }

                transactionPool.addTransaction(transaction);  
            }
        })
// ________validateTransaction
        it('should return valid transactions ', () => {
            expect(transactionPool.validateTransactions()).toEqual(transactions);//toStrictEqual
        });

    })
//____________________ ________________________
  describe('clear TransactionsPool  ', () => {
//_________ clear all transactions without controll if they moved to blockchain
        it('should remove  transactions', () => {
            transactionPool.clear({ chain: [] });
            expect(transactionPool.transactionMap).toEqual({});
        });
    })  
 //_________clear all transactions WITH  controll if they moved to blockchain
    describe('clearBlockTransactions   in blockchain ', () => {
        it('should remove of existing transactions', () => {
            
        const blockchain = new Blockchain();
        const expectedTransactionMap = {};
//    create false transactions
        for (let i = 0; i < 15; i++) {
            const transaction = new Wallet().createTransaction({        
                recipient: 'max 0x0000000000',
                amount: 33, 
            });
            // add transaction to transactionPool
            transactionPool.addTransaction(transaction);
  //check if transaction moved to blockchain
            if (i % 2 === 0) {
                blockchain.addBlock({ data: [transaction] });
            } else {  
                expectedTransactionMap[transaction.id] = transaction;
            }
        }

        //test 
        transactionPool.clearBlockTransactions({ chain: blockchain.chain });

        expect(transactionPool.transactionMap).toEqual(expectedTransactionMap);

    });
    })  






})  

