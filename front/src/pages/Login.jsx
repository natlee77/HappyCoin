import {useState} from "react";
import HttpClient from "../service/http";
import Error from "../components/Tools/Error";
import { jwtDecode } from "jwt-decode";
import Password from "../components/User/Password";
import Email from "../components/User/Email";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   

  const  LoginUser =async(e)=>{
    e.preventDefault() ; 
 
    const response = await loginToAccount(email,password);    
      
    const token = JSON.stringify(response.token); 
    localStorage.setItem('Bearer', token);

    const decoded = jwtDecode(token);
    const userExp=  decoded.exp;
    
    const user= await getUserRole(token) ;
    if (user.role === 'user'){
      // redirect
       location.href = './send'
    }else{
       location.href = './mine'
    }
      
    
  }
  async function loginToAccount( email,password ){
    const url = 'http://localhost:5001/api/v1/auth/login';
    const http = new HttpClient(url);
    return  await http.loginRequest( email,password );   
  }
  async function getUserRole( token){
    const url = 'http://localhost:5001/api/v1/auth/me';
    const http = new HttpClient(url);
   
    const user= await http.getUser(token); 
    return  user;
  }
  //_____________  
  return <>
  <div className="contact container">
   <article>
        <section id="contact-form login-form">
          <h1>Login</h1>
          <p>If you dont have an account please         
          <a href="/register" >  <span> Registrate  </span> 
          </a> </p>


          <form className="login"  onSubmit = {(e) => {
                 e.preventDefault();
                 LoginUser();}} >
          <div className = "val" >
            <Email updateEmail={setEmail}/>            
            <Password updatePassword={setPassword}/>
             
  
            <button className="btn" type="submit" onClick={e=> LoginUser(e)} >
              Log in
            </button>
          </div>
          </form>
        </section>

      </article>

   </div>
  </> 
};

export default Login;
