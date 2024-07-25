import {   validateString } from '../service/validate';

export default class User {
    #validator = {validated: true, msg: []}
    constructor(name, email, password, role ) {
        this.name = name;   
        this.email = email;
        this.password = password;
        this.role = role;
        this.validateOrder( )
    }
    validateOrder(check   ) {     
        const checkedName = validateString( this.name)
        console.log(checkedName);
        const checkedEmail = validateString( this.email)
        console.log(checkedEmail);
        const checkedPassword = validateString( this.password)
        console.log(checkedPassword);
        const checkedRole = validateString(this.role)
        console.log(checkedRole);
 
        if(checkedName !== true || checkedEmail !== true ||   checkedPassword !== true || checkedRole !== true) 
     
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
          if(typeof checkedRole === "string"){
            this.#validator.msg.push(checkedRole)
          }
          
       }  
        getValidation(){
           return this.#validator
       }
}