import {   validateString } from '../service/validate';

export default class User {
    #validator = {validated: true, msg: []}
    constructor(name, email, password ) {
        this.name = name;   
        this.email = email;
        this.password = password;
        // this.role = role;
        this.validateOrder( )
    }
    validateOrder(check   ) {     
        const checkedName = validateString( this.name)
        console.log(checkedName);
        const checkedEmail = validateString( this.email)
        console.log(checkedEmail);
        const checkedPassword = validateString( this.password)
        console.log(checkedPassword);
 
 
        if(checkedName !== true || checkedEmail !== true ||   checkedPassword !== true) 
         {        
             this.#validator.validated = false,
             this.#validator.id = this.id
         }
           if(typeof checkedName === 'string') {
           this.#validator.msg.push(checkedName)
          }
          if(typeof checkedEmail === 'string') {
           this.#validator.msg.push(checkedEmail)
          }
          if(typeof checkedPassword === 'string') {
           this.#validator.msg.push(checkedPassword)
          }
          
       }  
        getValidation(){
           return this.#validator
       }
}