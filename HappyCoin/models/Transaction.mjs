import { v4 as uuidv4 } from 'uuid';
import { verifySignature } from '../utilities/crypto-lib.mjs';
import { MINING_REWARD_ADRESS , MINING_REWARD} from '../config/settings.mjs';

export default class Transaction {
  constructor({ sender, recipient, amount ,inputMap, outputMap}) {
    this.id = uuidv4().replaceAll('-', '');    
    this.outputMap = outputMap || this.createOutputMap({  sender, recipient, amount });
    this.inputMap = inputMap || this.createInputMap({ 
           sender, 
           outputMap: this.outputMap });
  }

  
  // Static methods...
  static TransactionReward ({miner  }) { 
    
    //create new Transaction   {}
    return new this({ 
     //_______POPULERA {}
     inputMap: MINING_REWARD_ADRESS,
      //create outputMap: address, amount
     outputMap: {  
       [miner.publicKey]: MINING_REWARD
      }
    });
   
   
  }
  static validate(transaction) {
    //const {outputMap} = transaction;===exect the same as:
    //const{ address, amount, signature } = transaction.inputMap;
    // transaction {object}: outputMap & inputMap
    const { inputMap: { address, amount, signature },
            outputMap,} = transaction;
//summation of all amounts in outputMap
    const outputTotal = Object.values(outputMap).reduce( (total, amount) => total + amount  );
    // console.log('TOTAL:', outputTotal);
   //____________   
    if (amount !== outputTotal) return false;

    if (!verifySignature({ 
           publicKey: address, 
           data: outputMap, 
           signature }))
      return false;

    return true;
  }

 
  update({ sender, recipient, amount }) {
//test: the amount is invalid(not enough funds)  
    if (amount > this.outputMap[sender.publicKey])
      throw new Error('Not enough funds!');
// move in amount  to the outputMap    
    if (!this.outputMap[recipient]) {
      this.outputMap[recipient] = amount;      
    } else {
      //addera amount of the same recipient
      this.outputMap[recipient] = this.outputMap[recipient] + amount;    
    }    

//and remove the amount from the inputMap
    this.outputMap[sender.publicKey] =
      this.outputMap[sender.publicKey] - amount;
// create new inputMap--- updated
    this.inputMap = this.createInputMap({ sender, outputMap: this.outputMap });
  }

  //_________ Methods that create saldo of the transaction--
// outputMap : address, amount
  createOutputMap({ sender, recipient, amount }) {
    const outputMap = {};
      // console.log('SENDER____', sender);
    // console.log('RECIPIENT____', recipient);
    // console.log('AMOUNT_____', amount);
//2 in 1 
    outputMap[recipient] = amount;//50
    outputMap[sender.publicKey] = sender.balance - amount;//1000-50
    return outputMap;
  }
// inputMap: timestamp, balance,  signature, sender's public key
  createInputMap({ sender, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: sender.balance,
      address: sender.publicKey,
      signature: sender.sign(outputMap),
    };
  }
}
