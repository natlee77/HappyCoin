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
  //verify signature__________________
  sign(data) {
    return this.keyPair.sign(createHash(data));
  }

  //create a transaction___________  
  createTransaction({ recipient, amount }) 
   {
    if (amount > this.balance) throw new Error('Not enough funds!');

    return new Transaction({ sender: this, recipient, amount });
  }
}
