import { INITIAL_BALANCE } from '../config/settings.mjs';
//mer avancerad cryptering curve secp256k1(256 bits) https://github.com/indutny/elliptic  npm i elliptic 
import { ellipticHash, createHash } from '../utilities/crypto-lib.mjs';
//sha 256 matematisk form , cannot be reverse back -decryption
import Transaction from './Transaction.mjs';
 


export default class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    //create public and private key pair
    this.keyPair = ellipticHash.genKeyPair();
    // our adress
    this.publicKey = this.keyPair.getPublic().encode('hex');//to hash string
  }



//______________ static methods( object,not for use ).creates one time in memory 
 static calculateBalance({chain, address}) {
    let total = 0;
    //go through each block 
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      //go through each transaction in block
      for (let transaction of block.data) {
        //if the address matches
        const value = transaction.outputMap[address];
        if (value  ) {
          //add to total
          total += value;
        }
      }
    }
    return   INITIAL_BALANCE +  total;
  }

//______________ instance methods(object view,manipulation). create i memory new instsance 
  createTransaction({ recipient, amount }) 
   {
    if (amount > this.balance) throw new Error('Not enough funds!');

    return new Transaction({ sender: this, recipient, amount });
  }

//_________________verify signature_
  sign(data) {
      return this.keyPair.sign(createHash(data));
    }
}
