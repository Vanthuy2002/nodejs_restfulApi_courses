import { OutputTypes, logger } from '../helper/logger.js';

export class Exections extends Error {
  constructor(message, validate = {}) {
    super(message);
    logger(message, OutputTypes.ERROR);
    this.validate = validate;
  }
}
