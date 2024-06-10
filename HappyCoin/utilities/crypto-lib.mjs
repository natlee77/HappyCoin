import crypto from 'crypto';
import pkg from 'elliptic';
const {ec } = pkg;

export const createHash = (...args) => {
// console.log('...args:*__________', args);
  
return crypto
.createHash('sha256')
.update(args
            .map(arg => JSON.stringify(arg))//several args to string
            .sort()   
            .join('')
       )
.digest('hex');

// return crypto.createHash('sha256').update(args.sort().join('')).digest('hex');
}; 


export const ellipticHash = new ec('secp256k1');// Bitcoin use it- curve secp256k1(256 bits)

export const verifySignature = ({ publicKey, 
                                  data, 
                                  signature }) => {

  const key = ellipticHash.keyFromPublic(publicKey, 'hex');
  // console.log('key:___________ ', key);
  // console.log('signature_________: ', signature);
  return key.verify(createHash(data), signature);
};
