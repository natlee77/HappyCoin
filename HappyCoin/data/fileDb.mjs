import { writeFileAsync, readFileAsync } from  '../utilities/fileHandler.mjs';
import crypto from 'crypto';



export const saveUser = async (user) => {
  const users = await loadUsers(); 
 
  users.push(user);
  // write to DB 
  await writeFileAsync('data', 'users.json', JSON.stringify(users));
};

  export const findUserByEmail = async (email) => {
    const users = await loadUsers();
   const user = users.find((user) => user.email === email);

  if (!user) {
    throw new Error('can not find user :((((');
  }
//return anonymous object
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  };
 
  
 };

 export const findUserById = async (id) => {
  console.log('id:___________ ', id);
  
  const users = await loadUsers();
  const user = users.find((user) => user.id === id);

  if (!user) throw new Error(`can not find user :(((( by id:  ${id}`);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  };


 export const  findUserByResetPasswordToken = async (token) => {
    const users = await loadUsers();
    const user = users.find((user) => user.resetPasswordToken === token);
  
    if (!user) {
      throw new Error('can not find user with this resetPasswordToken :((((');
    }
    //return anonymous object
    return user;
  }



export const getResetPasswordToken = async (userId) => {
  // create reset token
  const resetToken =  crypto.randomBytes(20).toString('hex');
  // get all users
  const users = await loadUsers();
  //find user
  const user = users.find((user) => user.id === userId);
  // update hashed reset-token/sha256
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  // update reset-token-expire time
  user.resetPasswordTokenExpire =new Date (Date.now() + 10 * 60 * 1000).toLocaleString("sv-SE");
  // write to DB
 await updateUser(user);
  
  //return   object
  return user ;

}


export const updateUser = async (user) => {
  let users = await loadUsers();
  users= users.filter((u) => u.id !== user.id);
  users.push(user);
  
   await writeFileAsync('data', 'users.json', JSON.stringify(users));
}
// Help function...
const loadUsers = async () => {
  return await readFileAsync('data', 'users.json');
};
