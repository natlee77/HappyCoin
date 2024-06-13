//syncronisation
import PubNub from 'pubnub';

const CHANNELS = {
  DEMO: 'DEMO',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION',
};


export default class PubNubServer {
  constructor({ blockchain,transactionPool, wallet, credentials }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  broadcast() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    }); 
  }
  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction),
    });
  }

  listener() {
    return {
      message: (msgObject) => {
        const { channel, message } = msgObject;
        const msg = JSON.parse(message);       

        console.log(
          `Meddelande mottagits på kanal__________: ${channel}, meddelande: ${message}`
        );

        // if (channel === CHANNELS.BLOCKCHAIN) {
        //   this.blockchain.replaceChain(msg);
        // }

        // if (channel === CHANNELS.TRANSACTION) {
        //   this.transactionPool.addTransaction( msg);
        // }
        switch (channel) {
          case CHANNELS.BLOCKCHAIN:
            this.blockchain.replaceChain(msg);
            this.transactionPool.clearBlockTransactions({ chain: msg });
            break;
          case CHANNELS.TRANSACTION:
            if(  !this.transactionPool.transactionExist({
              address: this.wallet.publicKey
            })) {
              this.transactionPool.addTransaction(msg);
            }            
           
            break;
          default:
            break;
        }
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}
