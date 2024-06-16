import { writeFileAsync, readFileAsync } from  '../utilities/fileHandler.mjs';

export const saveUser = async (user) => {
  let users;
  if (!users){
     users = [];
  } else {
      users = await loadUsers();
  }
 
  users.push(user);
  await writeFileAsync('data', 'users.json', JSON.stringify(users));
};

// export const findUserByEmail = async (email) => {
//   const users = await loadUsers();
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     throw new Error('Kunde inte hitta användaren!');
//   }

//   return {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     password: user.password,
//   };
// };

export const findUserById = async (id) => {
  const users = await loadUsers();
  const user = users.find((user) => user.id === id);

  if (!user) throw new Error('Kunde inte hitta användaren');

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
// Hjälp funktion...
const loadUsers = async () => {
  // Läsa in filen users.json...
  return await readFileAsync('data', 'users.json');
};
