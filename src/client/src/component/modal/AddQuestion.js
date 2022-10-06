
import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import _ from 'lodash'

const questionTypes = ['text', 'radio', 'checkbox']

const AddQuestion = (props) => {
    const { addNewAndEdit: { isShow, isAdd, question: questionData }, handleClose, handleSave } = props
    /* `useState` is a React hook that allows you to have a state variable in a functional component. */
    const [question, setQuestion] = useState({})

    /* A hook that is called when the component is mounted. */
    useEffect(() => {
        setQuestion(questionData)
    }, [questionData])

    /**
     * Handle input change for 3 text, radio, checkbox question
     * @param e - the event object
     * @param question - the question object
     */
    const handleInputChange = (e, field) => {
        /* A shallow copy of the questions array. */
        const cloneQuestion = _.cloneDeep(question)
        const val = e.target.value
        if (field === 'options') {
            cloneQuestion[field] = val.split(';')
        } else if (field === 'isRequired') {
            cloneQuestion[field] = !cloneQuestion[field]
        } else {
            cloneQuestion[field] = val
        }
        setQuestion(cloneQuestion)
    }

    /**
     * `onSave` is a function that calls `handleSave` with the `isAdd` and `question` variables
     */
    const onSave = () => {
        handleSave(isAdd, question)
    }

    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label>Question Title</Form.Label>
                            <Form.Control onChange={(e) => handleInputChange(e, 'title')} value={question.title} type='text' placeholder='Enter title' />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Label>Question Type</Form.Label>
                            <Form.Select onChange={(e) => handleInputChange(e, 'type')} value={question.type}>
                                {questionTypes.map((type) => <option key={`${type}`} value={type}>{type}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Check onChange={(e) => handleInputChange(e, 'isRequired')} checked={question.isRequired} type='checkbox' label='Required' />
                        </Form.Group>
                        {question.type !== 'text' && <Form.Group className='mb-3'>
                            <Form.Label>Question Options</Form.Label>
                            <Form.Control onChange={(e) => handleInputChange(e, 'options')} value={question.options?.join(';')} as='textarea' placeholder='option1;options' />
                            <Form.Text className='text-muted'>
                                Enter options separate by ;
                            </Form.Text>
                        </Form.Group>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={onSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddQuestion