  import {useState, useEffect } from "react"; 
  import HttpClient from  "../service/http";  
 

const BlockChain = () => {
  const [blockchain, setBlockchain] = useState( [] );
  const [transactions , setTransactions] = useState([  ]);
      useEffect(() => {
        listBlockchain();
         setBlockchain  ( blockchain ); 
        //  setTransactions(transactions);
      }, [   ]);
 
 
    const listBlockchain = async () => {
      try {
        const http = new HttpClient();
        const result = await http.get('api/v1/blockchain');
        //http://localhost:5001/api/v1/blockchain
        console.log(result.data  );

        setBlockchain(result.data );
      //  setTransactions(result.data.data);

      } catch (error) {
        throw new Error
        (`problem to get data ${response.status} 
                              ${response.statusText}`);
      }
      }

    return (
   <>
        <div className = "blockchain container">
         <h1 > Blockchain </h1>
         <button className = "btn" onClick = {
         listBlockchain}> List All Blocks </button> 
         <h1 > Chain  : </h1>
  { blockchain.map((block) => {          
            return(
    <div  className="block" key={block.blockIndex}>
        <p> blockIndex : {block.blockIndex}</p>
        <p> timestamp : {block.timestamp}</p>
        <p> last block hash : {block.lastHash}</p>
        <p> block hash : {block.hash}</p>
       
                <div> data : {block.data.map((data) => {return ( 
                <div className="data-container"  >
                  <p> object : {block.data.map((data) => {return ( 
                <div className="data-container"  >
                  <p> object : { data.blockIndex  } </p>  
               </div>
             )})  } </p>  
               </div>
             )})  }</div>  

            <div> transactions :
            {transactions.map((tr) => {return ( 
                <div className="data-container" key={tr.transactionId}>
                <p>amount : {tr.amount} </p>
                <p>sender : {tr.sender} </p>
                <p>recipient : {tr.recipient} </p>
                <p>  transactionId : {tr.transactionId }   </p>
                </div>
               )})  }</div>   


             <p> nonce : {block.nonce}</p>
             <p> difficulty : {block.difficulty}</p>
           
             </div>
           ); 
     }
     )}   
      </div>  
 
 {/* <div className="transactions blockchain container">
      <h1 >  Pending Transactions : </h1>
             {transactions.map((tr) => {return ( 
                <div className="data-container" key={tr.transactionId}>
               <p>amount : {tr.amount} </p>
                <p>sender : {tr.sender} </p>
                <p>recipient : {tr.recipient} </p>
                <p>  transactionId : {tr.transactionId }   </p>
               </div>
              )})  }
   </div>   
 */}
     
       </>  
      );
  };

  export default BlockChain;