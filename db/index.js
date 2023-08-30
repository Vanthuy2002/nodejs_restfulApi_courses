import mongoose from 'mongoose';
import { OutputTypes, logger } from '../helper/logger.js';
import { Exections } from '../errors/Exection.js';

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/manager');
    logger('Connect db successfully!!', OutputTypes.SUCCESS);
  } catch (e) {
    const { code } = e;
    if (code == 8000) {
      throw new Exections('Invaid auth database');
    }
    throw new Exections('Can not connect to Mongose');
  }
};

export { connectDb };
