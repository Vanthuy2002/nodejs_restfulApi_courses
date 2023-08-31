import express from 'express';
import { studentController } from '../controllers/index.js';
const routerStudents = express.Router();

const {
  getAllStudents,
  handleCreateStudent,
  handleUpdate,
  getDetailStudent,
  generateData,
} = studentController;

routerStudents.get('/', getAllStudents);

routerStudents.get('/:id', getDetailStudent);

routerStudents.post('/insert', handleCreateStudent);

routerStudents.post('/create', generateData);

routerStudents.patch('/insert', handleUpdate);

export { routerStudents };
