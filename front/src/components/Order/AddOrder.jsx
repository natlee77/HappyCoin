import { useState} from "react"; 
 import Transaction from "../../models/Transaction";
 import HttpClient from "../../service/http";

import Sender from "./Sender";
import Recipient from "./Recipient";
import Amount from "./Amount";
import Error from "../Tools/Error";  

 const Order = ({     createNewOrder }) => {
     const [amount, setAmount ] = useState({});
     const [sender, setSender] = useState({});
     const [recipient, setRecipient] = useState({});
     const [error, setError] = useState(null)
     const [transaction , setTransaction] = useState({  new : Transaction }); 
   
    
     const createOrder = async (e) => {
         e.preventDefault()
        
      //  create new object(transaction)
     const newOrder = new Transaction(
            Number(amount),
            sender,
            recipient);  
          
    const check = newOrder.getValidation()        
    if(check.validated) {
      console.log('newOrder', newOrder);
         saveTransaction(newOrder);
         setTransaction(newOrder);
        
      }
      else {
        // alert(check.msg)
        setError(check)
      }
     };
     async function saveTransaction(obj) {
        const url = 'http://localhost:5001/api/v1/transactions/transaction';
        const http = new HttpClient(url);
        await http.add(obj);
        // redirect
        location.href = './blockchain'
      }
      const toggleError = () => {
        setError(null)
      }
     return ( 
        <>
          <div>  </div>
         {error && <Error key={error.id} msgs={error.msg} toggle={toggleError} />}
         <form className = "formOrder col-12"
         onSubmit = {(e) => {
                 e.preventDefault();
                 createOrder();}} >
         <div className = "val" >
  
         <Amount updateAmount = {setAmount }/> 
         <Sender updateSender = {setSender} />   
         <Recipient updateRecipient = {setRecipient} />   

         </div> 
         <h1 > Check Information that you adding to transaction </h1> 
         <div className = "data-container" >
         <p > amount :{JSON.stringify(amount)} </p> 
         <p > sender : {JSON.stringify(sender)} </p> 
         <p > recipient : {JSON.stringify(recipient)} </p>
         </div>


         <div className = "submit" >
         <button className = "button btn"
         onClick = {
             e => createOrder(e)
         } > Submit </button> </div> </form>
        
         </>
     );
 };

 export default Order;