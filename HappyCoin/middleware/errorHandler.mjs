import ErrorResponse from "../models/ErrorResponseModel.mjs";

const errorHandler = (err, req, res, next) => {
      
  let error = { ...err };
  error.message = err.message;
  
if (err.code === 11000) {
    const message = `Duplicate  value entered ${err.keyValue.title}`;
    error = new ErrorResponse(message, 400);
  }

     
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorResponse(`Information missing: ${message}`, 400);
      }
    
    res.status(err.statusCode|| 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        error: err.message || 'Server Error',
    });

};
 
export default errorHandler