import express from 'express';
import { studentController } from '../controllers/index.js';
const routerStudents = express.Router();

const { renderPage, handleCreateStudent, handleUpdate, getDetailStudent } =
  studentController;

routerStudents.get('/', renderPage);

routerStudents.get('/:id', getDetailStudent);

routerStudents.post('/insert', handleCreateStudent);

routerStudents.patch('/insert', handleUpdate);

export { routerStudents };
