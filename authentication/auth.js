import jwt from 'jsonwebtoken';
import { statusCodes } from '../errors/StatusCode.js';

export default function checkTokens(req, res, next) {
  // bypass login, register
  if (
    req.url.toLowerCase().trim() == '/user/login' ||
    req.url.toLowerCase().trim() == '/user/register'
  ) {
    next();
    return;
  }
  const token = req.headers?.authorization?.split(' ')[1];
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_KEY);
    const isExpired = Date.now() > jwtObject.exp * 1000;
    if (isExpired) {
      res.status(statusCodes.BAD_REQUEST).json({ message: error.toString() });
    } else {
      next();
    }
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ message: error.toString() });
  }
}
