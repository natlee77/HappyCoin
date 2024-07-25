 import { useState} from "react";
 import Select from "react-select"
 
 function Role({
   updateRole
 }) {
   const options = [
    {value : "user", label : 'user'},
    {value : "miner",  label : 'miner' },
    
   ]
   const [selectedOption, setSelectedOption] = useState("");

   const handleChange = (selectedOption) => {
    console.log("user", selectedOption);
    setSelectedOption(selectedOption.value);
     updateRole(selectedOption);
   };

   return ( <
     div > 
         <Select   options={options}
               onChange={handleChange}
             />   

     </div>
   );
 }

 export default Role;