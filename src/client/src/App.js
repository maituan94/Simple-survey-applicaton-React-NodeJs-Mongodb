import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './_global.scss'
import { Header, Footer } from './layout'
import { SignIn, Results, Questions } from './pages/admin'
import ToastMessage from './component/toast'
import Home from './pages/home'

export default function App() {
  /* Destructuring the `isLoggedin` property from the `auth` slice of the Redux store. */
  const { isLoggedin } = useSelector((state) => state.auth)
  return (
    <Router>
      <ToastMessage />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin'>
          <Route index element={isLoggedin ? <Questions /> : <SignIn />} />
          {isLoggedin && <>
            <Route path='questions' element={<Navigate to='/admin' replace />} />
            <Route path='results' element={<Results />} />
          </>}
        </Route>
        <Route
          path='*'
          element={<Navigate to='/' replace />}
        />
      </Routes>
      <Footer />
    </Router>
  )
}
