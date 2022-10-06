import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const DeleteQuestion = (props) => {
    const { deletedId, handleClose, handleSave } = props

    return (
        <>
            <Modal show={!!deletedId} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Question ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this question?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleSave}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteQuestion