import express from 'express';
import dotenv  from 'dotenv';
import Blockchain from './models/Blockchain.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';  //for requests PUT,POST,GET,DELETE
import { connectDB } from './data/mongoDB.mjs';

import authRouter from './routes/auth-routes.mjs';
import blockRouter from './routes/block-routes.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import transactionRouter from './routes/transaction-routes.mjs';
import PubNubServer from './pubnub-server.mjs';

import path from 'path';
import { fileURLToPath } from 'url';
import logger from './middleware/logger.mjs';
import errorHandler  from './middleware/errorHandler.mjs';
import logHandler from './middleware/logHandler.mjs';

dotenv.config({ path: './config/config.env' });

//connection MongoDB
connectDB();

// global _appdir for jsonDB ===__dirname(commonJs)
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
global._appdir = dirname;
// console.log('global._appdir______',global._appdir);

 
//all keys are in .env  --gitignore
const credentials = {
  publishKey: process.env.PUBLISH_KEY,
  subscribeKey: process.env.SUBSCRIBE_KEY,
  secretKey: process.env.SECRET_KEY,
  userId: process.env.USER_ID,
};
 

export const blockchain = new Blockchain();
export const transactionPool = new TransactionPool();
export const wallet = new Wallet();
export const pubnubServer = new PubNubServer(
  { blockchain: blockchain ,
    transactionPool: transactionPool,
    wallet: wallet,
    credentials:  credentials  
  });

 //Json DB
const app = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));// development
if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

const DEFAULT_PORT = +process.env.PORT  ||5010 ;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

let NODE_PORT;

setTimeout(() => {
  pubnubServer.broadcast();
}, 1000);


app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/block', blockRouter);
app.use('/api/v1/wallet', transactionRouter);
app.use('/api/v1/auth', authRouter);

// Catch all url...
app.all('*', (req, res, next) => {
  next(new ErrorResponse(`Can not find resource ${req.originalUrl}`, 404)); 
});

// Central felhantering...
app.use(logHandler);
//error handler--> efter router
app.use(errorHandler);
//synchronize blockchain
const synchronize = async () => {
//synchronize blockchain
  let response = await fetch(`${ROOT_NODE}/api/v1/blockchain`);
  if (response.ok) {
    const result = await response.json();
    blockchain.replaceChain(result.data);
  }
//synchronize transactionPool
  response  =   await fetch(`${ROOT_NODE}/api/v1/wallet/transactions`);
  if (response.ok) {
    const result = await response.json();
    transactionPool.updateTransactionMap(result.data);
  }
};

if (process.env.GENERATE_NODE_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;
console.log('NODE_PORT:_________ ', NODE_PORT);

//start server
const server= app.listen(PORT, () => {
  console.log(`Server is running on port___________: ${PORT} in mode ${process.env.NODE_ENV}`.bgBlue);
//synchronize blockchain if port is not 5001
  if (PORT !== DEFAULT_PORT) {
    synchronize();
  }
});

//rejection handler
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`.red.underline.bold);
  server.close(() => {
    process.exit(1);
  });
});
 
  