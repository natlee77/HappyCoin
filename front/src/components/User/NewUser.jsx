 
import { useState } from "react";
import HttpClient from "../../service/http";

import Error from "../Tools/Error";
import User from "../../models/User";
import Name from "./Name";
import Password from "./Password";
import Email from "./Email";
  import Role from "./Role";




function NewUser() {
   const [user, setUser] = useState({});
   const [error, setError] = useState(null);
   const [role, setRole] = useState('');
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   
const createUser = async (e) => {
    e.preventDefault()
   
 //  create new object(transaction)
const newUser = new User(
        name,
        email,          
        password,
        role
       );  
    
const check = newUser.getValidation()        
if(check.validated) {
      saveUser (newUser);
      setUser(newUser);
      
 }
 else {
   // alert(check.msg)
   setError(check)
 }

};
// send user  to blockchain
async function saveUser(obj) {
    const url = 'http://localhost:5001/api/v1/auth/register';
    const http = new HttpClient(url);
    await http.add(obj);
    // redirect
    location.href = './login'
  }
//error
const toggleError = () => {
    setError(null)
  }
    //_____________________________________________________________
    return <>
    <div className="contact container">
     <article>
          <section id="contact-form">
            <h1>Registrate New User</h1>
            
            {error && <Error key={error.id} msgs={error.msg} toggle={toggleError} />}
            <form  className = "formOrder col-12" onSubmit = {(e) => {
                 e.preventDefault();
                 createUser();}} >

            <div className = "val" >
              <Name updateName={setName} />
              <Password updatePassword={setPassword}  />
              <Email updateEmail={setEmail} />
              <Role updateRole={setRole} />
            </div>            
               
            <button  className="btn" type="submit" onClick = {
             e => createUser(e)}>Registrate new User</button>

            </form>
          </section>
  
        </article>
  
     </div>
    </> 
}

export default NewUser;
