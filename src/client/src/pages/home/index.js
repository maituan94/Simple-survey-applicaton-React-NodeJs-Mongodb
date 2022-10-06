import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Spinner } from 'react-bootstrap';
import moment from 'moment'
import AnswerPDF from '../../component/answerRender';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { saveAnswersApi, fetchQuestionsApi } from '../../services/api/admin.api';

const Home = () => {
    /* A hook that is used to store the state of the component. */
    const [email, setEmail] = useState('')
    const [questions, setQuestions] = useState([])
    const [isDownloadEnable, setIsDownloadEnable] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    /* Using moment.js to format the current date. */
    const currentDate = moment(new Date()).format('Do MMMM YYYY')

    /* A map of question type to the function that render the question. */
    const questionType = {
        'text': (q) => renderSimpleTextQuestion(q),
        'radio': (q) => renderRadioQuestion(q),
        'checkbox': (q) => renderCheckBoxQuestion(q)
    }

    /**
     * It takes the email and questions from the state and sends them to the API. If the API returns a
     * status code of 200, it enables the download button
     * @param e - The event object
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await saveAnswersApi({
            email, questions
        }, dispatch)
        if (response.statusCode === 200) {
            setIsDownloadEnable(true)
        }
    }

    /* A hook that is used to run a function when the component is mounted. */
    useEffect(() => {
        getQuestions()
    }, [])

    /**
     * It fetches the questions from the API and sets the state of the questions.
     */
    const getQuestions = async () => {
        setLoading(true)
        const response = await fetchQuestionsApi(dispatch)
        if (response.statusCode !== 200) {

        } else {
            setQuestions(response.questions)
        }
        setLoading(false)
    }

    /**
     * The function takes an event as an argument, and sets the email state to the value of the event
     * target
     * @param e - the event object
     */
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    /**
     * Handle input change for 3 text, radio, checkbox question
     * @param e - the event object
     * @param question - the question object
     */
    const handleInputChange = (e, question) => {
        /* A shallow copy of the questions array. */
        const cloneQuestions = [...questions]
        /* Used to find the index of the question in the questions array. */
        const questionIndex = cloneQuestions.findIndex((q) => q._id === question._id)
        /* This is a check to make sure that the question is in the questions array. */
        if (questionIndex === -1) return
        /* Getting the value of the input. */
        const val = e.target.value
        /* A switch statement that is used to handle the input change for 3 types of question: text,
        radio, checkbox. */
        switch (question.type) {
            case 'text':
                cloneQuestions[questionIndex]['value'] = val
                break
            case 'radio':
                cloneQuestions[questionIndex]['value'] = val
                break
            case 'checkbox':
                if (!cloneQuestions[questionIndex]['value']) {
                    cloneQuestions[questionIndex]['value'] = val
                } else {
                    let arrayVal = cloneQuestions[questionIndex]['value'].split(';')
                    const valIndex = arrayVal.findIndex((v) => v === val)
                    if (valIndex > -1) {
                        arrayVal.splice(valIndex, 1)
                    } else {
                        arrayVal.push(val)
                    }
                    cloneQuestions[questionIndex]['value'] = arrayVal.length > 0 ? arrayVal.join(';') : ''
                }
                break
            default:
                return
        }
        /* set the state of the questions. */
        setQuestions(cloneQuestions)
    }

    /**
     * Render text question
     * @param question - The question object
     * @returns A React component.
     */
    const renderSimpleTextQuestion = (question) => {
        return <>
            <Form.Label>{question.title}</Form.Label>
            <Form.Control required={question.isRequired} onChange={(e) => handleInputChange(e, question)} value={question.value || ''} as='textarea' rows={3} />
        </>
    }

    /**
     * Render Radio question
     * @param question - The question object
     * @returns A React component.
     */
    const renderRadioQuestion = (question) => {
        if (!question.options || question.options.length === 0) return <></>
        return <>
            <Form.Label>{question.title}</Form.Label>
            {question.options.map((opt, idx) =>
                <Form.Check onChange={(e) => handleInputChange(e, question)}
                    key={`${question.title}-${opt}-${idx}`}
                    name={question._id}
                    checked={question.value === opt}
                    type='radio'
                    value={opt}
                    label={opt}
                    required={question.isRequired}
                />)}
        </>
    }

    /**
     * Render checkbox question
     * @param question - The question object
     * @returns A React component.
     */
    const renderCheckBoxQuestion = (question) => {
        if (!question.options || question.options.length === 0) return <></>
        return <>
            <Form.Label>{question.title}</Form.Label>
            {question.options.map((opt, idx) =>
                <Form.Check onChange={(e) => handleInputChange(e, question)}
                    key={`${question.title}-${opt}-${idx}`}
                    name={question._id}
                    checked={question.value?.split(';').includes(opt) || false}
                    type='checkbox'
                    value={opt}
                    label={opt}
                // required={question.isRequired} 
                />)}
        </>
    }

    return (
        <div className='main'>
            <div className='container content'>
                {loading ? <Spinner className='loading-content' animation='border' role='status'>
                    <span className="visually-hidden">Loading...</span>
                </Spinner> : <>
                    <div className='current-date'>{currentDate}</div>
                    <h2 className='survey-title'>Example Survey</h2>
                    <div className='survey-information'>
                        <h4>Thank you for taking part in 😍</h4>
                        <p>Please complete this document to help us improve future sessions.</p>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={handleChangeEmail} value={email} type='email' placeholder='name@example.com' required />
                        </Form.Group>
                        {questions.map((q, index) => {
                            return <Form.Group key={`${q.title}-${index}`} className='mb-3'>
                                {questionType[q.type](q)}
                            </Form.Group>
                        })}
                        {!isDownloadEnable && <Button variant='outline-dark' type='submit'>Submit</Button>}

                        {isDownloadEnable && <PDFDownloadLink
                            document={<AnswerPDF date={currentDate}
                                title={'Example Survey'}
                                email={email}
                                questions={questions} />}
                            fileName={`${email}-${currentDate}.pdf`}>
                            <Button variant='outline-success'>Download Survey File!</Button>
                        </PDFDownloadLink>}
                    </Form>
                </>}
            </div>
        </div>
    )
}

export default Home