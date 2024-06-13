import Transaction from "./Transaction.mjs";

 

export default class Miner {
    constructor({ blockchain, wallet, transactionPool, pubnub }) {
      this.blockchain = blockchain;
      this.wallet = wallet;
      this.transactionPool = transactionPool;
      this.pubnub = pubnub;
    }

    mine() {
        //________ 1 get validetedtransaction from transaction pool  
        const validTransactions = this.transactionPool.validateTransactions();
        //________ 2 create awards for miner
        validTransactions.push( Transaction.TransactionReward(
            { miner: this.wallet }));
        //________ 3 add block to blockchain
        this.blockchain.addBlock({ data:  validTransactions });
        //________ 4 distribute blockchain  to all nodes
        this.pubnub.broadcast();        
        //________ 5 clear transaction pool
        this.transactionPool.clear();

    }

}
