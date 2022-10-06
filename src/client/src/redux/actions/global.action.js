import { createAction } from '@reduxjs/toolkit'
import { SET_MESSAGE } from '../types'

/* Creating an action creator. */
export const setMessage = createAction(SET_MESSAGE)