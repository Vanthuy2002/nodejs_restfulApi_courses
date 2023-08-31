import { MyStudents } from '../Model/index.js';
import { Exections } from '../errors/Exection.js';
import { faker } from '@faker-js/faker';

const generateStudents = async () => {
  [...Array(100).keys()].forEach(async (item) => {
    const fakeData = {
      name: `${faker.person.fullName()}_fake`,
      age: faker.number.int({ min: 10, max: 100 }),
      gender: faker.person.sex(),
      languages: [faker.location.country(), 'vietnamese'],
      phone: faker.phone.number(),
    };
    debugger;
    await MyStudents.create({ ...fakeData });
  });
};

const handleStudents = async ({ page, limit, search }) => {
  try {
    const studentInDb = await MyStudents.aggregate([
      {
        $match: {
          $or: [{ name: { $regex: `.*${search}.*`, $options: 'i' } }],
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);
    return studentInDb;
  } catch (error) {
    throw new Exections('Can not get api', error.message);
  }
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

const handleUpdateStudents = async ({
  id,
  name,
  age,
  phone,
  gender,
  languages,
}) => {
  try {
    const currentStudent = await MyStudents.findById(id).exec();
    currentStudent.name = name ?? currentStudent.name;
    currentStudent.age = age ?? currentStudent.age;
    currentStudent.phone = phone ?? currentStudent.phone;
    currentStudent.gender = gender ?? currentStudent.gender;
    currentStudent.languages = languages ?? currentStudent.languages;
    await currentStudent.save();
    return currentStudent;
  } catch (e) {
    if (e.errors) {
      throw new Exections('Input erorrs', e.errors);
    }
  }
};

const handleDetails = async ({ id }) => {
  const student = await MyStudents.findById(id).exec();
  return student || [];
};

const handleDeleteStudent = async ({ id }) => {
  await MyStudents.findByIdAndDelete(id).exec();
  debugger;
};

export {
  handleStudents,
  insertStudent,
  generateStudents,
  handleDetails,
  handleUpdateStudents,
  handleDeleteStudent,
};
