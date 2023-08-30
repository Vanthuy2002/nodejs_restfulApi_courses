import chalk from 'chalk';

class OutputTypes {
  static INFOMATION = 'INFOMATION';
  static SUCCESS = 'SUCCESS';
  static ERROR = 'ERROR';
  static WARN = 'WARN';
}
function logger(message, outputType) {
  switch (outputType) {
    case OutputTypes.ERROR:
      console.log(chalk.bgRed.black(message));
      break;

    case OutputTypes.SUCCESS:
      console.log(chalk.bgCyan.black(message));
      break;

    case OutputTypes.WARN:
      console.log(chalk.bgYellow.black(message));
      break;

    default:
      console.log(chalk.bgBlack.white(message));
  }
}

export { logger, OutputTypes };
