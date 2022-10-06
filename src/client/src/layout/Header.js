import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Nav, Container, Navbar } from 'react-bootstrap'

import { logout } from '../redux/actions/auth.actions'

const Header = () => {
    /* Destructuring the `isLoggedin` property from the `auth` slice of the Redux store. */
  const { isLoggedin } = useSelector((state) => state.auth)

  /* `useNavigate` is a React Router hook that allows us to navigate to a different route
  programmatically. */
  const navigate = useNavigate()

  /* `useDispatch` is a React Redux hook that returns a reference to the Redux store's `dispatch`
  function. */
  const dispatch = useDispatch()

  //Logout
  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  /**
   * It navigates to the admin page when the user clicks the login to sign in
   */
  const logIn = () => {
    navigate('/admin')
  }

  return (
    <Navbar bg='white' variant='white' className='header'>
      <Container>
        <Navbar.Brand href='/'>
          <img
            alt=''
            src='/assets/logo/moon.png'
            width='30'
            height='30'
            className='d-inline-block align-top'
          />{' '}
          Simple Survey Application
        </Navbar.Brand>
        { isLoggedin ? <>
          <Nav className='me-auto'>
            <Nav.Link href='/admin/questions'>Questions</Nav.Link>
            <Nav.Link href='/admin/results'>Results</Nav.Link>
          </Nav>
          <Nav className='justify-content-end'>
            <Navbar.Text onClick={logOut}>
              Logout
            </Navbar.Text>
          </Nav>
        </> : <Nav className='justify-content-end' onClick={logIn}>
            <Navbar.Text >
              Login
            </Navbar.Text>
          </Nav>}
      </Container>
    </Navbar>
  )
}

export default Header