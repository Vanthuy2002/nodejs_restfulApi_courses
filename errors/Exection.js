import { OutputTypes, logger } from '../helper/logger.js';

export class Exections extends Error {
  constructor(message) {
    super(message);
    logger(message, OutputTypes.ERROR);
  }
}
