import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Table, Alert, Spinner } from 'react-bootstrap'
import { fetchQuestionsApi } from '../../../services/api/admin.api'
import { AddQuestion, DeleteQuestion } from '../../../component/modal'
import { createQuestionApi, updateQuestionApi, deleteQuestionApi } from '../../../services/api/admin.api'
import './question.scss'

/* A constant that is used to create a new question. */
const emptyQuestion = {
  title: '',
  type: 'text',
  isRequired: false,
  options: []
}

const Questions = () => {
  /* A hook that is used to set the state of the loading. */
  const [loading, setLoading] = useState(false)
  /* A hook that is used to set the state of the questions. */
  const [questions, setQuestions] = useState([])
  /* A hook that is used to set the state of the addNewAndEdit. */
  const [addNewAndEdit, setAddNewAndEdit] = useState({
    isShow: false,
    isAdd: false,
    question: {}
  })
  const [deletedId, setDeletedId] = useState(null)
  /* Used to set the state of the deletedId. */
  /* Used to dispatch an action to the store. */
  const dispatch = useDispatch()

  /**
   * It sets the state of the modal to false, and sets the state of the question to an empty object
   */
  const handleCloseModal = () => {
    setAddNewAndEdit({
      isShow: false,
      isAdd: false,
      question: {}
    })
    setDeletedId(null)
  }
  /**
   * When the user clicks the "Add New" button, the `addNewAndEdit` state is set to show the
   * `AddNewAndEdit` component, and the `question` state is set to an empty question object
   */
  const handleAddNew = () => setAddNewAndEdit({
    isShow: true,
    isAdd: true,
    question: emptyQuestion
  })

  /**
   * It takes a question object as an argument and sets the state of the addNewAndEdit object to show
   * the edit form, and pass the question object to the form
   * @param question - the question object that is being edited
   */
  const handleEdit = (question) => setAddNewAndEdit({
    isShow: true,
    isAdd: false,
    question: question
  })
  /**
   * "When the user clicks the delete button, set the deletedId state to the id of the item they
   * clicked."
   * 
   * Now, let's add the delete button to the list item
   * @param id - The id of the item to be deleted
   */
  const confirmDelete = (id) => setDeletedId(id)

  /**
   * It's a function that takes in two parameters, isAdd and question, and then it calls the
   * createQuestionApi function if isAdd is true, otherwise it calls the updateQuestionApi function
   * @param isAdd - true if we are adding a new question, false if we are editing an existing question
   * @param question - The question object that is being edited or added.
   */
  const handleSave = async (isAdd, question) => {
    if (isAdd) {
      /* Calling the createQuestionApi function and passing the question object and the dispatch
      function as arguments. */
      await createQuestionApi(question, dispatch)
    } else {
      /* Calling the updateQuestionApi function and passing the question object and the dispatch
      function as arguments. */
      await updateQuestionApi(question, dispatch)
    }

    /* It fetches the questions from the API and sets the state of the questions. */
    getQuestions()

    /* It sets the state of the modal to false, and sets the state of the question to an empty object */
    setAddNewAndEdit({
      isShow: false,
      isAdd: false,
      question: {}
    })
  }

  /**
   * It calls the deleteQuestionApi function, which is an asynchronous function that makes a DELETE
   * request to the API, and then it calls the getQuestions function, which is a synchronous function
   * that makes a GET request to the API
   */
  const handleDelete = async () => {
    await deleteQuestionApi(deletedId, dispatch)
    setDeletedId(null)
    getQuestions()
  }

  /**
 * It fetches the questions from the API and sets the state of the questions.
 */
  const getQuestions = async () => {
    /* It sets the state of the loading to true. */
    setLoading(true)
    /* Calling the fetchQuestionsApi function, which is an asynchronous function that makes a GET
    request to the API, and then it is setting the state of the questions to the response.questions. */
    const response = await fetchQuestionsApi(dispatch)
    /* Checking if the status code of the response is 200, if it is, it sets the state of the questions
    to the response.questions. */
    if (response.statusCode === 200) {
      setQuestions(response.questions)
    }

    /* It sets the state of the loading to false. */
    setLoading(false)
  }

  /* Calling the getQuestions function when the component is mounted. */
  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <div className='questions main'>
      <div className='container content'>
        {loading ? <Spinner className='loading-content' animation='border' role='status'>
          <span className="visually-hidden">Loading...</span>
        </Spinner> : <>
          <div className='add-question'>
            <Button onClick={handleAddNew} variant='outline-dark'>Add</Button>
          </div>
          {questions.length > 0 ? <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>isRequired</th>
                <th>options</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, idx) => {
                return <tr key={`${q.title}-${idx}`}>
                  <td>{idx + 1}</td>
                  <td>{q.title}</td>
                  <td>{q.type}</td>
                  <td><Form.Check type='checkbox' checked={q.isRequired} onChange={() => { }} /></td>
                  <td>{q.options?.join(';')}</td>
                  <td><div className='edit-delete'><img onClick={() => handleEdit(q)} src='/assets/icons/edit.png' alt='icon-edit' /><img onClick={() => confirmDelete(q._id)} src='/assets/icons/delete.png' alt='icon-delete' /></div></td>
                </tr>
              })}
            </tbody>
          </Table> : <Alert variant='light' className='text-center'>
            There is no question, please add a new one!
          </Alert>}
          <AddQuestion addNewAndEdit={addNewAndEdit} handleClose={handleCloseModal} handleSave={handleSave} />
          <DeleteQuestion deletedId={deletedId} handleClose={handleCloseModal} handleSave={handleDelete} />
        </>}

      </div>
    </div>
  )
}

export default Questions