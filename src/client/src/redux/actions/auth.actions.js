
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LOGIN_TYPE, LOGOUT_TYPE } from '../types'
import { loginAPI, logOut } from '../../services/api/login.api'

/* Creating a thunk that will be dispatched to the store. */
export const login = createAsyncThunk(LOGIN_TYPE, loginAPI)
export const logout = createAsyncThunk(LOGOUT_TYPE, logOut)