import { logger, OutputTypes } from '../helper/logger.js';

const getAllStudents = async ({ page, size, searchString }) => {
  logger(
    `get all students ${page} ${size} ${searchString}`,
    OutputTypes.INFOMATION
  );
};

const insertStudent = async ({ name, email, language, gender, age }) => {
  logger(
    `Insert students ${name} ${email} ${language} ${gender} ${age}`,
    OutputTypes.INFOMATION
  );
};

export { getAllStudents, insertStudent };
