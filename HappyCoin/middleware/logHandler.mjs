import fs   from 'fs';
import path from 'path';

const logHandler = (err, req, res, next) => {
  //   path (__appdir-catalog  , ! __dirname(same folder as we now is))
  const filePath = path.join(_appdir, 'logs', 'error.log');
  //  ____err
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Server Error';
//___msg 
  const message = `Method: ${req.method} 
                   Url: ${req.originalUrl} 
                   Date: ${new Date().toLocaleDateString('sv-SE')} 
                   Time: ${new Date().toLocaleTimeString('sv-SE')}
                   Success: ${err.success} - 
                   Message: ${err.message}\n`;
  // save to log
  fs.appendFileSync(filePath, message);
  res.status(err.statusCode).json({ success: err.success, message: err.message });
};

export default logHandler;
