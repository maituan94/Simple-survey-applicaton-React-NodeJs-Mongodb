import { fetchQuestions, createQuestion, updateQuestion, deleteQuestion, saveAnswers, getAnswers } from '../admin.service';
import { setMessage } from '../../redux/actions/global.action';

/**
 * It fetches questions from the API and returns the response data if the status code is 200, otherwise
 * it returns an error message
 * @param dispatch - This is the dispatch function that we get from the useReducer hook.
 * @returns 1. If the response is successful, the dispatchMessage function is called with the dispatch,
 * true, and the message.
 *     2. If the response is unsuccessful, the dispatchMessage function is called with the dispatch,
 * false, and the error message.
 *     3. If there is an error, the dispatchMessage function is called with the dispatch, false, and
 * the error message
 */
const fetchQuestionsApi = async (dispatch) => {
    try {
        const response = await fetchQuestions()
        if (response.data.statusCode === 200) {
            dispatchMessage(dispatch, true, 'Fetch Questions Successfully!')
            return response.data
        }
        return dispatchMessage(dispatch, false, response.data?.error?.message)
    } catch (err) {
        return dispatchMessage(dispatch, false, err.message)
    }
}

/**
 * It's a function that sends a request to the server to create a question and returns a message to the
 * user
 * @param payload - the data that will be sent to the server
 * @param dispatch - the dispatch function from the useReducer hook
 */
const createQuestionApi = async (payload, dispatch) => {
    try {
        const response = await createQuestion(payload)

        if (response.data?.statusCode === 200) {
            return dispatchMessage(dispatch, true, 'Create question successfully!')
        }

        if (response.data?.error?.message === 'Unauthorized!') {
            localStorage.removeItem('user')
            window.location.reload()
        }
        
        return dispatchMessage(dispatch, false, response.data?.error?.message)

    } catch (err) {
        return dispatchMessage(dispatch, false, err.message)
    }
}

/**
 * It sends a request to the server to update a question
 * @param payload - the data that will be sent to the server
 * @param dispatch - the dispatch function from the useReducer hook
 */
const updateQuestionApi = async (payload, dispatch) => {
    try {
        const response = await updateQuestion(payload)

        if (response.data?.statusCode === 200) {
            return dispatchMessage(dispatch, true, 'Update question successfully!')
        }

        if (response.data?.error?.message === 'Unauthorized!') {
            localStorage.removeItem('user')
            window.location.reload()
        }
        return dispatchMessage(dispatch, false, response.data?.error?.message)
    } catch (err) {
        return dispatchMessage(dispatch, false, err.message)
    }
}

/**
 * It sends a request to the backend to delete a question
 * @param payload - the data that will be sent to the API
 * @param dispatch - the dispatch function from the useReducer hook
 */
const deleteQuestionApi = async (payload, dispatch) => {
    try {
        const response = await deleteQuestion(payload)

        if (response.data?.statusCode === 200) {
            return dispatchMessage(dispatch, true, 'Delete question successfully!')
        }

        if (response.data?.error?.message === 'Unauthorized!') {
            localStorage.removeItem('user')
            window.location.reload()
        }
        return dispatchMessage(dispatch, false, response.data?.error?.message)
    } catch (err) {
        return dispatchMessage(dispatch, false, err.message)
    }
}

/**
 * It's a function that takes in a payload and a dispatch function, and returns a response object
 * @param payload - the data to be sent to the API
 * @param dispatch - the dispatch function from the redux store
 * @returns - If the response is successful, the function will return the response data.
 *     - If the response is not successful, the function will return the error message.
 */
const saveAnswersApi = async (payload, dispatch) => {
    try {
        const response = await saveAnswers(payload)
        if (response.data.statusCode === 200) {
            dispatchMessage(dispatch, true, 'Save answers successfully!')
            return response.data
        }
        return dispatchMessage(dispatch, false, response.data?.error?.message)
    } catch (err) {
        return dispatchMessage(dispatch, false, err.message)
    }
}


/**
 * It fetches answers from the API and returns the response data if the status code is 200, otherwise
 * it returns a message
 * @param dispatch - the dispatch function from redux
 * @returns - If the response is successful, the response data is returned
 *     - If the response is unsuccessful, the dispatchMessage function is returned
 */
const fetchAnswersApi = async (dispatch) => {
    try {
        const response = await getAnswers()
        if (response.data.statusCode === 200) return response.data
        return dispatchMessage(dispatch, true, 'Fetch answers successfully!')
    } catch (err) {
        return dispatchMessage(dispatch, false, err.message)
    }
}

/**
 * It takes a dispatch function, a boolean, and a string, and returns the dispatch function with the
 * message object as an argument
 * @param dispatch - the dispatch function from redux
 * @param isSuccess - boolean
 * @param content - The message content
 * @returns A function that takes dispatch as an argument and returns a function that takes isSuccess
 * and content as arguments.
 */
const dispatchMessage = (dispatch, isSuccess, content) => {
    return dispatch(setMessage({
        isSuccess,
        content,
        show: true
    }))
}

export {
    fetchQuestionsApi,
    createQuestionApi,
    updateQuestionApi,
    deleteQuestionApi,
    saveAnswersApi,
    fetchAnswersApi
}