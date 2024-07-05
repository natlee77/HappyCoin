 

A complete blockchain for my own cryptocurrency 'Happycoin' with transaction management and validation of the transactions.
 - I use a transaction pool to manage transactions before they are placed in a block.
 - When a block is created for the transactions, a "reward transaction" is also created and tracked in the transaction pool.    
 - The transactions are validated.
###  _______Network
- It starts up several nodes with the blockchain. 
- Synchronization of the blockchain takes place when starting a new node, when adding transactions and when a block is created.
- The technology for network communication: Pubnub.
- The block chain, blocks and transactions are saved in a MongoDB database. (Although this is in principle not necessary in a real block chain).
### _______Security
- To be able to use a blockchain as a consumer, you must be registered and logged in.
- Here  use Json Web Token (JWT) as a technology
  -> to validate that a user is logged in and belongs to the correct role 
   -> to be able to create a new transaction 
   -> and to be able to list their own transactions and blocks. 
- Users must be stored in a mongodb document.
### _______Client App
A client is developed in an application with HTML and CSS:
- React with Vite

The client application can create:
- new transactions,
- list transactions  and list blocks.
- it is possible to create a block of transactions, i.e. "mine" of blocks.

#### _______Passed Requirement (Good)
All of the above must be in place for the grade G.
#### _______Passed (VeryGood)
For VG, TDD must be used for transaction management. All "Best practices" that we went through during the course must be used. That is, Clean Code, SOC, MVC.
In addition, the server must be secure against various types of attacks, for example NoSqlinjections, DDOS and XSS attempts.