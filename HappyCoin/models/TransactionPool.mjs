 import Transaction from "./Transaction.mjs";


 export default class TransactionPool {
   constructor() {
     this.transactionMap = {};
   }

   //________add transaction to pool___________
   addTransaction(transaction) {  
     this.transactionMap[transaction.id] = transaction;
   }

   //___________replace transaction
   updateTransactionMap(transactionMap) {
     this.transactionMap = transactionMap;
   }
   //_______________ find transaction by address
   transactionExist({  address  }) {
     // object.values() - convert object{transactionMap} to array
     const transactions = Object.values(this.transactionMap);
     // find transaction by address||undefined
     return transactions.find(
       (transaction) => transaction.inputMap.address === address
     );
   }
 }