import { blockchain } from '../server.mjs';
import ErrorResponse
 from '../models/ErrorResponseModel.mjs';
 import { asyncHandler } from "../middleware/asyncHandler.mjs";

export const listBlock =asyncHandler(async (req, res, next) => {
  if (blockchain.chain.length === 0) {
    return next(
      new ErrorResponse('There are no blocks in the blockchain', 404)
    )
  } else {
    return res
      .status(200)
      .json({ success: true, statusCode: 200, data: blockchain.chain });
  }
  
});
