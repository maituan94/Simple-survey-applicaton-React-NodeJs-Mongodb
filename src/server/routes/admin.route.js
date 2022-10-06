import express from 'express'
import { verifyToken } from '../middlewares/authJWT.js'

import { updateQuestion, getQuestions, deleteQuestion, insertQuestion, createAnswer, getAnswers } from '../controllers/admin.controller.js'

/* Creating a new router object. */
const AdminRouter = express.Router()

/* This is a route that is used to create a new question. */
AdminRouter.post('/question/create', [verifyToken], insertQuestion);

/* This is a route that is used to update a question. */
AdminRouter.post('/question/update', [verifyToken], updateQuestion);

/* This is a route that is used to get all the questions. */
AdminRouter.get('/questions', getQuestions);

/* This is a route that is used to delete a question. */
AdminRouter.delete('/question/delete/:id',[verifyToken], deleteQuestion)

/* This is a route that is used to create a new answer. */
AdminRouter.post('/answers/submit', createAnswer)

/* This is a route that is used to get all the answers. */
AdminRouter.get('/answers',[verifyToken], getAnswers)

export default AdminRouter