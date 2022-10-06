import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { Table, Button, Alert } from 'react-bootstrap'
import { fetchAnswersApi } from '../../../services/api/admin.api'
import { DownloadTableExcel } from 'react-export-table-to-excel'


function Results() {
  /* A React Hook that is used to store the answers in the state. */
  const [answers, setAnswers] = useState([])
  /* A React Hook that is used to dispatch actions to the Redux store. */
  const dispatch = useDispatch()
  /* A React Hook that is used to store a reference to the table element. */
  const tableRef = useRef(null)
  /* Getting the current date and formatting it to `MM-DD-YYYY` format. */
  const currentDate = moment(new Date()).format('MM-DD-YYYY')

  /* A React Hook that is used to perform side effects in function components. */
  useEffect(() => {
    getAnswers()
  }, [])

  /**
   * `getAnswers` is an async function that fetches answers from the API and sets the answers in the
   * state
   */
  const getAnswers = async () => {
    const response = await fetchAnswersApi(dispatch)
    if (response?.answers) {
      setAnswers(response.answers)
    }
  }


  return (
    <div className='questions main'>
      <div className='container content'>
        <div className='float-end'>
          <DownloadTableExcel
            filename={`Sample-Survey-${currentDate}`}
            sheet={`${currentDate}`}
            currentTableRef={tableRef.current}
          >
            <Button variant='outline-dark'> Export excel </Button>
          </DownloadTableExcel>
        </div>
        <Table striped ref={tableRef}>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((ans, idx) => <tr key={`${ans.email}-${ans.value}`}>
              <td>{idx + 1}</td>
              <td>{ans.email}</td>
              <td>{ans.question_id?.title}</td>
              <td>{ans.value}</td>
            </tr>)}
          </tbody>
        </Table>
        {!(answers.length > 0) && <Alert variant='light' className='text-center'>
          No answer for this survey, yet!
        </Alert>}
      </div>
    </div>
  )
}

export default Results