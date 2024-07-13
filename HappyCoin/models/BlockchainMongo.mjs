import mongoose from "mongoose";


// import { createHash } from '../utilities/crypto-lib.mjs';
// import Transaction from './Transaction.mjs';
// import { MINING_REWARD, MINING_REWARD_ADRESS } from '../config/settings.mjs';

const blockSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    required: true
    },
  lastHash: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: [true, "add data"]
  },
  nonce: {
    type: Number,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
});

const blockchainSchema = new mongoose.Schema({
  chain: [blockSchema]
});

  
 

export default  mongoose.model('Chain', blockchainSchema);