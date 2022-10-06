import React, { useState, useRef, useEffect } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../../redux/actions/auth.actions'
import './SignIn.scss'

const SignIn = () => {
    /* A hook that allows us to navigate to a different route. */
    const navigate = useNavigate()
    /* A hook that allows us to dispatch actions to the store. */
    const dispatch = useDispatch()
    /* A hook that allows us to use state in a functional component. */
    const [loading, setLoading] = useState(false)
    /* Destructuring the `isLoggedIn` property from the `auth` slice of the store. */
    const { isLoggedIn } = useSelector((state) => state.auth)

    /* Creating a reference to the input fields. */
    const userNameRef = useRef()
    const passwordRef = useRef()

    /**
     * A function that handles the login process.
     * @param e - The event object
     */
    const handleLogin = (e) => {
        /* It prevents the default behavior of the event. */
        e.preventDefault()

        /* Setting the `loading` state to `true`. */
        setLoading(true)

        /* A nullish coalescing operator. It is a logical operator that returns its right-hand side
        operand when its left-hand side operand is null or undefined, and otherwise returns its
        left-hand side operand. */
        const username = userNameRef.current?.value || ''
        const password = passwordRef.current?.value || ''

        /* Dispatching the `login` action with the username and password. */
        dispatch(login({ username, password }))
            .unwrap()
            .then(() => {
                navigate('/admin')
                window.location.reload()
            })
            .catch(() => {
                setLoading(false)
            })
    }

    /* A React hook that is called after every render. It is used to perform side effects. */
    useEffect(() => {
        if (userNameRef.current && passwordRef.current) {
            userNameRef.current.value = ''
            passwordRef.current.value = ''
        }
    }, [])

    /* Checking if the user is logged in. If the user is logged in, it will redirect the user to the
    profile page. */
    if (isLoggedIn) {
        return <Navigate to='/profile' />;
    }

    return (
        <div className='sign-in main'>
            <div className='container content'>

                <div className='form-sign-in'>
                    <h3>Sign In to Admin</h3>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                required
                                type='text'
                                placeholder='User Name'
                                ref={userNameRef}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                required
                                type='password'
                                placeholder='Password'
                                ref={passwordRef}
                            />
                        </Form.Group>
                        <Button disabled={loading} variant='outline-secondary' type='submit'>
                            {loading && <span><Spinner animation='grow' size='sm' />  </span>}
                            Sign In
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default SignIn