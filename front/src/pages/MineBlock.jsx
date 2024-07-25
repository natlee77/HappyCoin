
import HttpClient from "../service/http";
import { jwtDecode } from "jwt-decode";

  const MineBlock = () => {     

    const mineBlock = async(e) => {
      e.preventDefault();

      const token = JSON.parse(localStorage.getItem('Bearer'));
      const decoded = jwtDecode(token);
      console.log('exp:token::::',decoded.exp);
      //should be check on EXP token
      if (!token){
        location.href = './login'   
      }
      else{
       await mineRequest(token);
       location.href = './blockchain' 
      }
    }
   async function mineRequest(token){
    const url = 'http://localhost:5001/api/v1/wallet/mine';
    const http = new HttpClient(url);
    return  await http.mine(token);   
   }
    return ( 
      <>
      
       
       <form className = "formOrder col-12"
       onSubmit = {(e) => {
               e.preventDefault();
               mineBlock();}} >
       <div className = "submit" >
       <button className = "button btn"
       onClick = {e => mineBlock(e)}> Mine</button>
       </div> 
       </form>        
       </>
   );  
 
  };

  export default MineBlock;
