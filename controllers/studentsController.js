import { statusCodes } from '../errors/StatusCode.js';
import {
  generateStudents,
  insertStudent,
  handleStudents,
  handleDetails,
  handleUpdateStudents,
} from '../repogistory/studentRepo.js';
import { CURRENT_PAGE, LIMIT } from '../utils/contanst.js';

const { OK, BAD_REQUEST, INTERNAL_SERVER, NOT_FOUND } = statusCodes;

const getAllStudents = async (req, res) => {
  try {
    let { page = CURRENT_PAGE, limit = LIMIT, search = '' } = req.query;
    limit = limit >= LIMIT ? LIMIT : limit;
    page = parseInt(page);

    const students = await handleStudents({ page, limit, search });
    res
      .status(OK)
      .json({ page, limit, search, size: students.length, students });
  } catch (excetion) {
    res
      .status(INTERNAL_SERVER)
      .json({ message: 'Can not get students', errors: excetion.validate });
  }
};

const generateData = async (req, res) => {
  try {
    const data = await generateStudents();
    res.json({
      message: 'Create student successfully!!',
      student: data.length,
    });
  } catch (excetion) {
    res
      .status(BAD_REQUEST)
      .json({ message: 'Can not create students', errors: excetion.validate });
  }
};

const getDetailStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const studentDetails = await handleDetails({ id });
    res.status(OK).json({ student: studentDetails });
  } catch (exection) {
    res
      .status(NOT_FOUND)
      .json({ message: 'Can not find student', error: exection.validate });
  }
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
const handleUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await handleUpdateStudents({ id, ...req.body });
    res.status(OK).json({
      message: 'Update student successfully!',
      student: updatedStudent,
    });
  } catch (excection) {
    res.status(BAD_REQUEST).json({
      message: 'Can not updated student!!',
      error: excection.toString(),
    });
  }
};

const studentController = {
  getAllStudents,
  handleCreateStudent,
  handleUpdate,
  getDetailStudent,
  generateData,
};

export default studentController;
