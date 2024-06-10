import { v4 as uuidv4 } from 'uuid';
import { validateNum, validateString } from '../service/validate';

export default class Transaction {

  #validator = {validated: true, msg: []}

  constructor(amount, sender, recipient) {

    this.amount = amount;
    this.sender = sender;
    this.recipient = recipient;
    this.transactionId = uuidv4().replaceAll('-', '');

     this.validateOrder( )
  }
  validateOrder(check   ) {
     
       const checkedAmount = validateNum( this.amount)
       console.log(checkedAmount);
       const checkedSender = validateString( this.sender)
       console.log(checkedSender);
       const checkedRecipient = validateString( this.recipient)
        console.log(checkedRecipient);


       if(checkedAmount !== true || checkedSender !== true ||   checkedRecipient !== true)
        {        
            this.#validator.validated = false,
            this.#validator.id = this.id
        }
          if(typeof checkedAmount === 'string') {
          this.#validator.msg.push(checkedAmount)
         }
         if(typeof checkedSender === 'string') {
          this.#validator.msg.push(checkedSender)
         }
         if(typeof checkedRecipient === 'string') {
          this.#validator.msg.push(checkedRecipient)
         }
         
      }
    
       getValidation(){
          return this.#validator
      }
}
