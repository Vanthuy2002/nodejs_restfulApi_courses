import { validationResult } from 'express-validator';
import userRepo from '../repogistory/userRepo.js';
import { EventEmitter } from 'node:events';
import { statusCodes } from '../errors/StatusCode.js';
import { OutputTypes, logger } from '../helper/logger.js';
import { message } from '../errors/message.js';

const { OK, BAD_REQUEST, CREATED, INTERNAL_SERVER } = statusCodes;

// init Events
const myEvents = new EventEmitter();
// listen envents
myEvents.on('event.register.user', (params) => {
  console.log('Send something....', JSON.stringify(params));
});

const { login, register } = userRepo;

const getDetailsUser = (req, res) => {
  res.status(OK).json({ message: 'This is details page os user' });
};

const handleLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({ errors: errors.array() });
  }
  // handle after validator
  try {
    const { email, password } = req.body;
    const exitUser = await login({ email, password });
    res.status(OK).json({ message: message.login.SUCCESS, data: exitUser });
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: error.toString() });
  }
};

const handleRegister = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  myEvents.emit('event.register.user', { email, password });

  try {
    const user = await register({ name, email, password, phone, address });
    res
      .status(CREATED)
      .json({ message: message.resgister.SUCCESS, data: user });
  } catch (error) {
    res.status(INTERNAL_SERVER).json({ message: message.resgister.USER_EXIT });
    logger(error, OutputTypes.ERROR);
  }
};

const userController = { handleLogin, handleRegister, getDetailsUser };

export default userController;
