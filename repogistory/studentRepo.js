import { logger, OutputTypes } from '../helper/logger.js';
import { MyStudents } from '../Model/index.js';
import { Exections } from '../errors/Exection.js';

const getAllStudents = async ({ page, size, searchString }) => {
  logger(
    `get all students ${page} ${size} ${searchString}`,
    OutputTypes.INFOMATION
  );
};

const insertStudent = async ({ name, age, phone, gender, languages }) => {
  try {
    const newStudent = await MyStudents.create({
      name,
      age,
      phone,
      gender,
      languages,
    });
    return newStudent;
  } catch (e) {
    if (e.errors) {
      throw new Exections('Input erorrs', e.errors);
    }
  }
};

export { getAllStudents, insertStudent };
