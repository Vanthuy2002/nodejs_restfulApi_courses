import express from 'express';
const routerUser = express.Router();
import { userController } from '../controllers/index.js';
import { body } from 'express-validator';

const { handleLogin, handleRegister, getDetailsUser } = userController;

routerUser.get('/', (req, res) => {
  res.send('This is Users Page');
});

routerUser.get('/:id', getDetailsUser);

routerUser.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  handleLogin
);

routerUser.post('/register', handleRegister);

export { routerUser };
