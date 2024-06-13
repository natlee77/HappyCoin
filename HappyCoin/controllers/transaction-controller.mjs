import { transactionPool } from '../server.mjs';
import { wallet } from '../server.mjs';
import { blockchain } from '../server.mjs';
import  Miner from '../models/Miner.mjs';
import { pubnubServer } from '../server.mjs';
  
//________logic --> add , get
export const addTransaction = (req, res, next) => {
    const { recipient,amount } = req.body;
    //we need update transactions  if has already  -> get by id(pool-->transactionExists)
    let transaction = transactionPool.transactionExist({address: wallet.publicKey});
    try {
        if (transaction) {
            transaction.update({ sender: wallet, recipient, amount });
        } else {
            transaction = wallet.createTransaction({recipient,amount});
        }
    } catch (error) {
        res
            .status(400)
            .json({success: false, statusCode: 400,data: error.message });
    }
    transactionPool.addTransaction(transaction); 
            //     "Nataliya  ": 44,
            //     "max  ": 11,
    pubnubServer.broadcastTransaction(transaction);
    res.status(201)
    .json({success: true,statusCode: 201,data: transaction});
};

export const getTransactionPool = (req, res, next) => {

    res
        .status(200)
        .json({ success: true,  statusCode: 200,
            data: transactionPool.transactionMap
        });


}


export const mineTransactions = (req, res, next) => {
    const miner  = new Miner({
      blockchain,
      transactionPool,
      wallet, 
      pubnub: pubnubServer,
    });
  console.log('-------------', miner );
  
    miner.mine(); 
    
    // fetch(`${ROOT_NODE}/api/v1/blockchain`);
  
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: ' Transaction mined successfully',
    });
  };
  