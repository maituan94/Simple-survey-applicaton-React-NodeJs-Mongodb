import axios from 'axios'
import authHeader from './auth.header'
const API_URL = 'http://localhost:4000/admin/'


/**
 * It returns a promise that will resolve to an array of questions
 * @returns An array of objects
 */
const fetchQuestions = () => {
    return axios.get(API_URL + 'questions')
}

/**
 * It takes a question object as an argument and returns a promise that will resolve to the newly
 * created question object
 * @param question - The question object that we want to create.
 * @returns An data object
 */
const createQuestion = (question) => {
    return axios.post(`${API_URL}question/create`, { question }, { headers: authHeader() })
}

/**
 * It takes a question object as a parameter, and then sends a POST request to the server with the
 * question object as the body of the request
 * @param question - The question object that you want to update.
 * @returns The question is being returned.
 */
const updateQuestion = (question) => {
    return axios.post(`${API_URL}question/update`, { question }, { headers: authHeader() })
}

/**
 * It deletes a question from the database
 * @param id - The id of the question to be deleted
 * @returns The question is being deleted from the database.
 */
const deleteQuestion = (id) => {
    return axios.delete(`${API_URL}question/delete/${id}`, { headers: authHeader() })
}

/**
 * It takes a payload object as an argument, and then it sends a POST request to the server with the
 * payload as the body of the request
 * @param payload - {
 * @returns A promise
 */
const saveAnswers = (payload) => {
    return axios.post(`${API_URL}answers/submit`, payload)
}

/**
 * It returns a promise that will resolve to an array of answers
 * @returns An array of objects
 */
const getAnswers = () => {
    return axios.get(`${API_URL}answers`, { headers: authHeader() })
}

export {
    fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    saveAnswers,
    getAnswers
}