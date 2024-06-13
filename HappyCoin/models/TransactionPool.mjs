 import Transaction from "./Transaction.mjs";


 export default class TransactionPool {
   constructor() {
     this.transactionMap = {};
   }
 
   addTransaction(transaction) {  
     this.transactionMap[transaction.id] = transaction;
   }

   //________clear transaction from pool___________
   clear() {
     this.transactionMap = {};
   }
   clearBlockTransactions({ chain }) {
    // ____lopp through chain
    for (let i = 1; i < chain.length; i++) {
    // take block at each iteration...
      const block = chain[i];
      // Go through each transaktion in block 
      for (let transaction of block.data) {
        // if transaction exist in transactionMap...
        if (this.transactionMap[transaction.id]) {
         // delete  transaction from transactionMap 
          delete this.transactionMap[transaction.id];
        }
      }
    }
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
    
   validateTransactions() {
  //filtrera TransactionMap() and check if each Transaction validate( ) 
     const validTransactions = Object
       .values(this.transactionMap)
       .filter((transaction) => Transaction.validate(transaction));
     return validTransactions;
   }
 }