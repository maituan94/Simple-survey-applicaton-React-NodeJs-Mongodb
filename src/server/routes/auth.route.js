import express from 'express';
import { signin } from '../controllers/auth.controller.js'

/* Creating a new router object. */
const AuthRouter = express.Router()

/* Creating a new route for the signin function. */
AuthRouter.post('/signin', signin);

export default AuthRouter;