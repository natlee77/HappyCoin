 import { useState} from "react";
 import Select from "react-select"
 
 function Role({
   updateRole
 }) {
   const options = [
    {value : "user", label : 'user'},
    {value : "miner",  label : 'miner' },
    {value : "admin",   label : 'admin'},
   ]
   const [selectedOption, setSelectedOption] = useState("");

   const handleChange = (e) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption.value);
     updateRole(selectedOption.value);
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