import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, Toast } from 'react-bootstrap'
import { setMessage } from '../../redux/actions/global.action'

const ToastMessage = () => {
    /* Destructuring the state.global object. */
    const { message: { show, content, isSuccess } } = useSelector(state => state.global)
    /* A hook that returns a reference to the dispatch function from the Redux store. */
    const dispatch = useDispatch()

/**
 * It sets the message state to an object with the following properties:
 * 
 * - isSuccess: null
 * - content: ''
 * - show: false
 * 
 * The isSuccess property is set to null because we don't want to show a success or error message when
 * the message is closed
 */
    const onClose = () => {
        dispatch(setMessage({
            isSuccess: null,
            content: '',
            show: false
        }))
    }

    return (
        <ToastContainer className='toast-container' containerPosition='fixed' position='bottom-end'>
            <Toast show={show} autohide delay={4000} onClose={onClose} bg={isSuccess ? 'success' : 'danger'}>
                <Toast.Header closeButton={false}>
                    <small className='text-muted'>just now</small>
                </Toast.Header>
                <Toast.Body>{content}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastMessage