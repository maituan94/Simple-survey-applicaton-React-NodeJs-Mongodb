import { createSlice } from '@reduxjs/toolkit'
import { login, logout } from '../actions/auth.actions'
const user = JSON.parse(localStorage.getItem('user'))

const initialState = user ? { isLoggedin: true, user } : { isLoggedin: false, user: null }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        /* A reducer that is being called when the login action is fulfilled. */
        [login.fulfilled]: (state, action) => {
            state.isLoggedin = true
            state.user = action.payload.user
        },
        /* A reducer that is being called when the login action is rejected. */
        [login.rejected]: (state, action) => {
            state.isLoggedin = false
            state.user = null
        },
        /* A reducer that is being called when the logout action is fulfilled. */
        [logout.fulfilled]: (state, action) => {
            state.isLoggedin = false
            state.user = null
        }
    }
})

const { reducer } = authSlice

export default reducer