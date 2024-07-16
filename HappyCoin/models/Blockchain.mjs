import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './Block.mjs';
import Chain from './BlockchainMongo.mjs'
import Transaction from './Transaction.mjs';
import { MINING_REWARD, MINING_REWARD_ADRESS } from '../config/settings.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis];
    this.updateChainMongoDB(this.chain);
  }

  // Instance method...
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain.at(-1),
      data: data,
    });
    this.chain.push(newBlock);
    this.updateChainMongoDB(this.chain);
    return newBlock;
  }

  replaceChain(chain, shouldValidate, onSuccess) {
    if (chain.length <= this.chain.length) return;
    if (!Blockchain.validateChain(chain)) return;
   
   //"shouldValidate" flag is true by default
    if (shouldValidate && !this.validateTransactionData({ chain })) {
      console.log('Invalid transaction data in chain');
      return;
    }
     //transactionPool clearBlockTransactions() and sync with blockchain
     if (onSuccess) callback();

    this.chain = chain;
  }

  validateTransactionData({ chain }) {
    // Loop through each block in chain
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const transactionSet = new Set();
      let count = 0;
      // Loop through each transaction in block      
      for (let transaction of block.data) {
        //validate mining reward
        if (transaction.inputMap.address === MINING_REWARD_ADRESS.adress){
          count ++;
          if(count > 1) return false;
          // last outputMap {} does not contain mining reward  
          if(Object.values(transaction.outputMap)[0] !== MINING_REWARD) 
            return false;
        }else{
        // Validate transaction
        if (!Transaction.validate(transaction)){
          return false;
        }  
        //  check for same transaction 
        if (transactionSet.has(transaction)) {
          return false;
        } else {
          transactionSet.add(transaction); 
        }
        }
      } 
    }
    return true;
  }
 

  // Static methods...
  // Concensus
  static validateChain(chain) {
    // Regel 1. Ha ett korrekt genesis block
    if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, data, nonce, difficulty } =
        chain.at(i);
      const currentLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;

      // Regel 2. Föregående blocks hash måste stämma överens med aktuellt blocks lastHash...
      if (lastHash !== currentLastHash) return false;

      // Skydda oss mot för stora skillnader i difficulty värdet både uppåt och nedåt...
      if (Math.abs(lastDifficulty - difficulty) > 1) return false;

      // Regel 3. Kontrollera så att blocket är ok...
      // Att ingen har manipulerat datat...
      const validHash = createHash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty
      );
      if (hash !== validHash) return false;
    }

    return true;
  }

  async updateChainMongoDB(newChain) {
    try {
      await Chain.deleteMany({});
      const chainMongo = new Chain({ chain: newChain });
      const result = await chainMongo.save();

      console.log(
        'Blockchain successfully updated in the database',
        result
      );
    } catch (error) {
      throw new ErrorResponse(
        'Failed to update the blockchain in Mongo DB :(',
        500 );
    }
  }
}
