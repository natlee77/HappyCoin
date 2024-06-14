import {
  it,
  describe,
  expect,
  beforeEach,
  vi
} from 'vitest';
import Wallet from '../models/Wallet.mjs';
import {
  verifySignature
} from '../utilities/crypto-lib.mjs';
import Transaction from '../models/Transaction.mjs';
import {
  INITIAL_BALANCE
} from '../config/settings.mjs';
import Blockchain from '../models/Blockchain.mjs';

describe('Wallet', () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  describe('properties', () => {
    it('should have a property named balance', () => {
      expect(wallet).toHaveProperty('balance');
    });

    it('should have a property named publicKey', () => {
      // console.log('publicKey: ', wallet.publicKey );
      expect(wallet).toHaveProperty('publicKey');
    });
  });

  describe('Signing process', () => {
    let data = 'test-data';

    it('should verify a signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: wallet.sign(data),
        })
      ).toBe(true);
    });

    it('should not verify an invalid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: new Wallet().sign(data),
        })
      ).toBe(false);
    });
  });

  describe('Create transaction', () => {
    describe('and the amount is larger than the balance', () => {
      it('should throw an error', () => {
        expect(() =>
          wallet.createTransaction({
            amount: 898989,
            recipient: 'Darth Vader'
          })
        ).toThrow('Not enough funds!');
      });
    });
    describe('and the amount is valid', () => {
      let transaction, amount, recipient;

      beforeEach(() => {
        amount = 25;
        recipient = 'Michael';
        transaction = wallet.createTransaction({
          amount,
          recipient
        });
      });
      it('should create a Transaction object', () => {
        expect(transaction).toBeInstanceOf(Transaction);
      });

      it('should match the wallet input', () => {
        expect(transaction.inputMap.address).toEqual(wallet.publicKey);
      });

      it('should output the amount to the recipient', () => {
        expect(transaction.outputMap[recipient]).toEqual(amount);
      });
    });

    //when we do new transaction and pass chain always call calculateBalance
    describe('and a chain is supplied', () => {
      it('should call `Wallet.calculateBalance`', () => {
        //mock function
        const calculateBalanceMock = vi.fn();

        // 1--to be able reset mockfunction
        const originalCalculateBalance = Wallet.calculateBalance;
        // calculateBalance to mock(mockfunction--will effect all tests)
        Wallet.calculateBalance = calculateBalanceMock  ;

          wallet.createTransaction({ 
            amount: 10,
            recipient: ' Vader',
            chain: new Blockchain() 
          });

        expect(calculateBalanceMock).toHaveBeenCalled();
        // 2--reset function
        Wallet.calculateBalance = originalCalculateBalance;

      });
    });

  });


  describe('Balance', () => {
    let blockchain;
    beforeEach(() => {
      blockchain = new Blockchain();
    });

    //case 1
    describe('should check transactions in output for the wallet', () => {

      it('should return initial balance for the wallet', () => {
        expect(Wallet.calculateBalance({
            chain: blockchain.chain,
            address: wallet.publicKey
          }))
          .toEqual(INITIAL_BALANCE);
      });



    });
    //case 2
    describe('should check chenges in output/transactions for the wallet', () => {
      //simulate 2 transactions   
      let transaction1, transaction2;
      beforeEach(() => {
        transaction1 = new Wallet().createTransaction({
          recipient: wallet.publicKey,
          amount: 5
        });
        transaction2 = new Wallet().createTransaction({
          recipient: wallet.publicKey,
          amount: 10
        });
        blockchain.addBlock({
          data: [transaction1, transaction2]
        });
      });

      it('should return the sum of all outputs(transactions) for the wallet', () => {
        expect(Wallet.calculateBalance({
          chain: blockchain.chain,
          address: wallet.publicKey
        })).toEqual(
          INITIAL_BALANCE +
          transaction1.outputMap[wallet.publicKey] +
          transaction2.outputMap[wallet.publicKey]
        ); //1015
      });

      describe('and the wallet has made a transaction', () => {
        let latestTransaction;

        beforeEach(() => {
          latestTransaction = wallet.createTransaction({
            recipient: 'Nataliya', //send  to (-)
            amount: 30
          })
          blockchain.addBlock({
            data: [latestTransaction]
          });
        });

        it('should return the latest balance', () => {
          expect(Wallet.calculateBalance({
              chain: blockchain.chain,
              address: wallet.publicKey
            }) //my wallet
          ).toEqual(
            latestTransaction.outputMap[wallet.publicKey]
          ); //1000-30=970
        });

        describe('and there are outputs next and efter recent transaction', () => {
          let currentBlockTransaction, nextBlockTransaction;
          //simulate several transactions and put them in different blocks
          beforeEach(() => {
            //_________create transaction
            // in my wallet
            latestTransaction = wallet.createTransaction({
              recipient: "max",
              amount: 75
            });
            // rewards for miner wallet
            currentBlockTransaction = Transaction.TransactionReward({ 
              miner: wallet
            });
            //put transaction in en block
            blockchain.addBlock({
              data: [latestTransaction, currentBlockTransaction]
            });

            //_________create next transaction
            nextBlockTransaction = new Wallet().createTransaction({
              recipient: wallet.publicKey,
              amount: 33
            })

            blockchain.addBlock({
              data: [nextBlockTransaction]
            });
          });

          it('should include amount from returned balance ', () => {
            expect(Wallet.calculateBalance({
              chain: blockchain.chain,
              address: wallet.publicKey
            })).toEqual( 
              latestTransaction.outputMap[wallet.publicKey] +
              currentBlockTransaction.outputMap[wallet.publicKey] +
              nextBlockTransaction.outputMap[wallet.publicKey]
            );
          });
        });
      });
    });
  });
});