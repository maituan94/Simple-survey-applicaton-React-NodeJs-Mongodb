import Question from '../models/question.model.js';
import Answer from '../models/answer.model.js'

/**
 * It updates a question in the database
 * @param req - The request object.
 * @param res - The response object.
 * @returns The question is being returned.
 */
const updateQuestion = (req, res) => {
    const question = req.body?.question
    if (!question) {
        res.status(200).json({
            statusCode: 401,
            error: { message: 'Invalid question' }
        })
        return
    }
    Question.findByIdAndUpdate(question._id, {
        title: question.title,
        type: question.type,
        isRequired: question.isRequired,
        options: question.options
    }, function (err, data) {
        if (err) {
            console.log(err)
            res.status(200).json({
                statusCode: 500,
                error: { message: 'Internal Server Error!' }
            })
            return
        } else {
            console.log('Update Question', data)
            res.status(200).json({
                statusCode: 200,
                question: data
            })
        }
    })
}

/**
 * It takes a question object from the request body, validates it, and then inserts it into the
 * database
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 * @returns A function that takes in a request and response object.
 */
const insertQuestion = (req, res) => {
    const question = req.body?.question
    if (!question) {
        res.status(200).json({
            statusCode: 401,
            error: { message: 'Invalid question' }
        })
        return
    }

    Question.create({
        title: question.title,
        type: question.type,
        isRequired: question.isRequired,
        options: question.options
    }, function (err, data) {
        if (err) {
            console.log(err)
            res.status(200).json({
                statusCode: 500,
                error: { message: 'Internal Server Error!' }
            })
            return
        } else {
            console.log('Insert Question', data)
            res.status(200).json({
                statusCode: 200,
                question: data
            })
        }
    })
}

/**
 * It finds all the questions in the database and returns them to the user
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 * @returns An array of questions
 */
const getQuestions = (req, res) => {
    Question.find({}, function (err, data) {
        if (err) {
            console.log(err)
            res.status(200).json({
                statusCode: 500,
                error: { message: 'Internal Server Error!' }
            })
            return
        } else {
            console.log('Get Questions', data)
            res.status(200).json({
                statusCode: 200,
                questions: data
            })
        }
    })
}

/**
 * It deletes a question from the database
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const deleteQuestion = (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(200).json({
            statusCode: 401,
            error: { message: 'Invalid Question Id' }
        })
        return
    }
    Question.findByIdAndDelete(id, function (err, data) {
        if (err) {
            console.log(err)
            res.status(200).json({
                statusCode: 500,
                error: { message: 'Internal Server Error!' }
            })
            return
        } else {
            console.log('Get Questions', data)
            res.status(200).json({
                statusCode: 200,
                message: 'Delete question successfully!'
            })
        }
    })
}

/**
 * It takes in a request body with an email and an array of questions, then creates an answer for each
 * question in the array
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const createAnswer = (req, res) => {
    const { email, questions } = req.body

    questions?.forEach(async q => {
        await Answer.create({
            question_id: q._id,
            value: q.value,
            email
        }).catch(err => {
            res.status(200).json({
                statusCode: 500,
                message: 'Internal Server Error'
            })
        })
    });
    res.status(200).json({
        statusCode: 200,
        message: 'Submit Answers Successfully!'
    })
}

/**
 * It fetches all the answers from the database and populates the question_id field with the question
 * object
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const getAnswers = (req, res) => {
    Answer.find({}).populate('question_id').sort('email').exec(function (err, data) {
        if (err) {
            res.status(200).json({
                statusCode: 500,
                message: 'Submit Answers Successfully!'
            })
        } else {
            res.status(200).json({
                statusCode: 200,
                answers: data
            })
        }
    })
}

export {
    updateQuestion,
    insertQuestion,
    getQuestions,
    deleteQuestion,
    createAnswer,
    getAnswers
}