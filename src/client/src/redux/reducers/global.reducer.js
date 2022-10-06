import { createSlice } from '@reduxjs/toolkit'
const globalSlice = createSlice({
    name: 'global',
    initialState: {
        message: {
            isSuccess: null,
            content: '',
            show: false
        }
    },
    reducers: {
        /* A reducer. It is a function that takes in the current state and an action and returns a new
        state. */
        setMessage: (state, action) => {
            state.message = action.payload
        }
    }
})

const { reducer } = globalSlice

export default reducer