import { Exections } from '../errors/Exection.js';
import { message } from '../errors/message.js';
import { MyUsers } from '../Model/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async ({ email, password }) => {
  const exitingUser = await MyUsers.findOne({ email }).exec();

  if (exitingUser) {
    const isMatched = await bcrypt.compare(password, exitingUser.password);
    if (isMatched) {
      const token = jwt.sign({ data: exitingUser }, process.env.JWT_KEY, {
        expiresIn: '1h',
      });

      const userLogin = { ...exitingUser.toObject(), token };
      return userLogin;
    } else {
      throw new Exections(message.login.NOT_COMPARE);
    }
  } else {
    throw new Exections(message.login.NOT_COMPARE);
  }
};

const register = async ({ name, email, password, phone, address }) => {
  const exitingUser = await MyUsers.findOne({ email }).exec();
  if (!!exitingUser) {
    throw new Error('User already exits');
  }
  // hash password
  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUND)
  );

  // write to db
  const newUser = await MyUsers.create({
    name,
    email,
    password: hashPassword,
    phone,
    address,
  });

  return newUser;
};

export default { login, register };
