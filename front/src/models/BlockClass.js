export default class Block {  
  constructor({ timestamp, 
                lastHash, 
                hash, 
                data, 
                nonce, 
                difficulty,
                transactions }) 
 {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.transactions = transactions;
    this.difficulty = difficulty;
  } 
}
