import {it, describe, expect,  beforeEach} from 'vitest';
import Wallet from  '../models/Wallet.mjs';
import Transaction from '../models/Transaction.mjs';
import { createHash, verifySignature} from  '../utilities/crypto-lib.mjs';
import { MINING_REWARD_ADRESS, MINING_REWARD } from '../config/settings.mjs';

describe('Transaction', () => {
  let transaction, sender, recipient, amount;

  beforeEach(() => {
    sender = new Wallet();
    recipient = 'recipient-mocka-address 0x0000000000';
    amount = 150;

    transaction = new Transaction({
      sender,
      recipient,
      amount
    });
  });

  describe('properties', () => {
    it('should have a property named id', () => {
      expect(transaction).toHaveProperty('id');
    });

    it('should have a property named outputMap', () => {
      expect(transaction).toHaveProperty('outputMap');
    });

    it('should have a property named inputMap', () => {
      expect(transaction).toHaveProperty('inputMap');
    });
  });

  describe('outputMap()', () => {
    //recipient-outputMap should have : amount,adress
    it('should display the recipients balance', () => {
      expect(transaction.outputMap[recipient]).toEqual(amount);
    });
    //sender publicKey=adress
    it('should display the senders balance', () => {
      expect(transaction.outputMap[sender.publicKey]).toEqual(
        sender.balance - amount
      );
    }); //balance 1000-50
  });

  describe('inputMap()', () => {
    // timestamp
    it('should have a property named timestamp', () => {
      expect(transaction.inputMap).toHaveProperty('timestamp');
    });
    // balance
    it('should set the amount to the senders balance', () => {
      expect(transaction.inputMap.amount).toEqual(sender.balance);
    });
    // address
    it('should set the address value to the senders publicKey', () => {
      expect(transaction.inputMap.address).toEqual(sender.publicKey);
    });
    // signature
    it('should sign the input', () => {
      expect(
        verifySignature({
          publicKey: sender.publicKey,
          data: transaction.outputMap, //50,recipient-ADRESS
          signature: transaction.inputMap.signature,
        })
      ).toBe(true);
    });
  });
  //___________
  describe('validate the transaction', () => {
    //valid
    describe('when the transaction is valid', () => {
      it('should return true', () => {
        expect(Transaction.validate(transaction)).toBe(true);
      });
    });
    //invalid
    describe('when the transaction is invalid', () => {
      describe('and the transactions outputMap value is invalid', () => {
        it('should return false', () => {
          transaction.outputMap[sender.publicKey] = 0x99996699449393;
          expect(Transaction.validate(transaction)).toBe(false);
        });
      });
      describe('and the transactions inputMap signature is invalid', () => {
        it('should return false', () => {
          transaction.inputMap.signature = new Wallet().sign('Stendumt-gjort');
          
          
          expect(Transaction.validate(transaction)).toBe(false);
        });
      });
    });
  });
  
  
  //________.update() transaction
  describe('Update transaction', () => {
    let orgSignature, 
    orgSenderOutput, 
    nextRecipient, 
    nextAmount;
// invalid amount___________________
    describe('and the amount is invalid(not enough funds)', () => {
      it('should throw an error', () => {
        expect(() => {
          transaction.update({ sender, recipient, amount: 1010 });
        }).toThrow('Not enough funds!');
      });
    });
//valid amount:_____________________
    describe('and the amount is valid', () => {
      beforeEach(() => {
        orgSignature = transaction.inputMap.signature;
        orgSenderOutput = transaction.outputMap[sender.publicKey];
        nextAmount = 25;
        nextRecipient = 'GustavVasan 0x0000000000';

        transaction.update({
          sender,
          recipient: nextRecipient,
          amount: nextAmount,
        });
      });

      it('should display the amount for the next recipient', () => {
        expect(transaction.outputMap[nextRecipient]).toEqual(nextAmount);
      });

      it('should withdraw the amount from the original sender output balance', () => {
        expect(transaction.outputMap[sender.publicKey]).toEqual(
          orgSenderOutput - nextAmount
        );
      });

      it('should match the total output amount with the input amount', () => {
        expect(
          Object.values(transaction.outputMap).reduce(
            (total, amount) => total + amount
          )
        ).toEqual(transaction.inputMap.amount);
      });

      it('should create a new signature for the transaction', () => {
        expect(transaction.inputMap.signature).not.toEqual(orgSignature);
      });
    
    });
  });
  //_______________________________________
  describe(' Transaction reward', () => {
    let rewardTransaction , miner;    
    
    beforeEach(() => {
      miner = new Wallet();
      rewardTransaction = Transaction.TransactionReward({ miner });      
    });

    it('should create a reward transaction with adress of the miner', () => {
       expect(rewardTransaction.inputMap).toEqual(MINING_REWARD_ADRESS);
    });

    it('should create only (One)  reward transaction ', () => {
      expect(rewardTransaction.outputMap[miner.publicKey]).toEqual(MINING_REWARD);
    });
  });
});