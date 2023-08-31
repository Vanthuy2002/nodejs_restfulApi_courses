import { statusCodes } from '../errors/StatusCode.js';
import { insertStudent } from '../repogistory/studentRepo.js';

const { OK, BAD_REQUEST } = statusCodes;

const renderPage = (req, res) => {
  res.status(OK).json({
    message: 'Get all students',
    data: [
      {
        name: 'Thuy nguyen',
        age: 21,
        gender: 'male',
      },
      {
        name: 'Unknow People',
        age: 21,
        gender: 'female',
      },
    ],
  });
};

const getDetailStudent = (req, res) => {
  res.status(OK).json({ message: 'This is details page of students' });
};

// handle post students
const handleCreateStudent = async (req, res) => {
  try {
    const student = await insertStudent({ ...req.body });
    res
      .status(OK)
      .json({ message: 'Add student successfully!!!', data: student });
  } catch (excetion) {
    res
      .status(BAD_REQUEST)
      .json({ message: 'Can not create students', errors: excetion.validate });
  }
};

// handle Update or create new
const handleUpdate = (req, res) => {
  res.send('Patch will create new object if it not exist');
};

const studentController = {
  renderPage,
  handleCreateStudent,
  handleUpdate,
  getDetailStudent,
};

export default studentController;
