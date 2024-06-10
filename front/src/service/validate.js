

export const validateString = ( string ) =>  {
    if(string.trim().length < 3) 
        return 'String needs to be longer that 3 characters...'
    if(string.trim().length > 20) 
        return 'String needs to be no longer that 20 characters...'
    else return true
}

export const validateNum = ( num ) =>  {
    console.log('num', num);
    
    if(typeof  num  ===   NaN || typeof num !== 'number' || typeof num ===  null || typeof num === 'undefined'||typeof  num === 'string'||typeof  num  ===   'NaN')
        return 'Amount is not a number...'
    if(num < 0.001) 
        return 'Amount has to be more than 0.001 ...'
    else return true
}