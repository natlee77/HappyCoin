 
const BASE_URL= 'http://localhost:5001'

export default class HttpClient  {    
  #url = '';

  constructor(url) {
    this.#url = url;
  }
//metod get  
async get(resourse) {
        const baseUrl=`${BASE_URL}/${resourse}`;       
         const response = await fetch( baseUrl );   
        
         
    try{
        if (response.ok) {
            // read data from response{o}- async             
             const data = await response.json();
             return data;        
              
          } else {
            //if bad request 400-  
            throw new Error(`problem to get data ${response.status} ${response.statusText}`);
          }
    } catch (error) {     
        throw new Error(`Error in  get(): ${error.message}`);
      }
    }


async getUser(  token){       
 
  
  try{
    const response = await fetch(this.#url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`
      }     
    })

    if (response.ok) {
      // read data from response 
         const result = await response.json();         
        return result.data;        
    } else {
            //if bad request 400-  
            throw new Error(`problem to get data ${response.status} ${response.statusText}`);
          }
    } catch (error) {     
        throw new Error(`Error in  getUser: ${error.message}`);
      }
    }


//metod post  
async add(obj) {  
  const token = JSON.parse(localStorage.getItem('Bearer'));
  if (!token) {
    return { error: true, message: 'Auth  token is missing' };
  }
  try {
      const response = await fetch(this.#url , {
        //post metod--create packet
        method: 'POST',
        //send to server Json format
       headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
       },
       //send  data as string
       body: JSON.stringify(obj),
      });

    if (response.ok) {
        const result = await response.json();
      
      //  return result;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error in add metod : ${error}`);
    
  }
}
async loginRequest(email, password)   {
  try {
    const response = await fetch(this.#url , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
    
       return result;
  } else {
    throw new Error(`${response.status} ${response.statusText}`);
  }
} catch (error) {
  throw new Error(`Error in add metod : ${error}`);  
}
   
};
 
async mine(token) {
  try{
    const response = await fetch(this.#url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ token }`
      }     
    })

    if (response.ok) {
      // read data from response 
         const result = await response.json();         
         return result;        
    } else {
            //if bad request 400-  
            throw new Error(`problem to get data ${response.status} ${response.statusText}`);
          }
    } catch (error) {     
        throw new Error(`Error in mineBlock: ${error.message}`);
      }
    }

 
};
 