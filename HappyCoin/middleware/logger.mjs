import fs from 'fs';
import path  from 'path';

const logger = (req, res, next) => {
//   path (__appdir-catalog  , ! __dirname(same folder as we now is))
  const filePath = path.join(_appdir, 'logs', 'app.log');
  
  
//____msg
  const message = `${req.method} ${req.originalUrl} 
   -   ${req.headers['user-agent']}    
  ${new Date().toLocaleDateString('sv-SE')}- ${new Date().toLocaleTimeString('sv-SE')}\n`;

 
//____save msg to log file
  fs.appendFileSync(filePath, message);

  next();
};

export default logger;
