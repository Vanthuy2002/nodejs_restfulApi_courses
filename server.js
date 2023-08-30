import express from 'express';
import * as dotenv from 'dotenv';
import { routerUser, routerStudents } from './router/index.js';
import { connectDb } from './db/index.js';
import checkTokens from './authentication/auth.js';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(checkTokens);

app.use('/user', routerUser);
app.use('/student', routerStudents);
app.get('/', (req, res) => res.send('This is Home Page'));

app.listen(port);

// connect to db
connectDb();
