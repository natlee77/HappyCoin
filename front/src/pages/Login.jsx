import {useState} from "react";
import HttpClient from "../service/http";
import Error from "../components/Tools/Error";
 
import Name from "../components/User/Name";
import Password from "../components/User/Password";

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  
  //_____________ 
  return <>
  <div className="contact container">
   <article>
        <section id="contact-form">
          <h1>Login</h1>
          <p>If you dont have an account please         
          <a href="/register" >  <span> Registrate  </span> 
          </a>   
          
          </p>
          <form>
          <div className = "val" >
            <Name updateName={setName} />
            
            <Password updatePassword={setPassword} />
             
            <button
              className="btn"
              type="submit">
              log in
            </button>
          </div>
          </form>
        </section>

      </article>

   </div>
  </> 
};

export default Login;
