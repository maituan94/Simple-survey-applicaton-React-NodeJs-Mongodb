import express from'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import AuthRouter from './routes/auth.route.js';
import AdminRouter from './routes/admin.route.js'

dotenv.config();

/* Creating a constant variable called dbConfig that is an object with the properties user, password,
host, and database. The values of these properties are the values of the environment variables
MONGO_USER, MONGO_PASSWORD, MONGO_HOST, and MONGO_DATABASE. */
const dbConfig = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    database: process.env.MONGO_DATABASE
}

const app = express();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

/* This is telling the app to use the AuthRouter and AdminRouter when the url is /auth and /admin
respectively. */
app.use('/auth', AuthRouter)
app.use('/admin', AdminRouter)

/* This is creating a constant variable called CONNECTION_URL that is a string with the value of the
connection string to the database. */
const CONNECTION_URL = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}?retryWrites=true&w=majority`
/* This is setting the port to the value of the environment variable PORT or 4000 if the environment
variable PORT is not set. */
const PORT = process.env.PORT || 4000;

/* This is connecting to the database and then starting the server. */
mongoose.connect(CONNECTION_URL, { })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));