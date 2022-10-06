import {configureStore} from '@reduxjs/toolkit'
import authReducer from './redux/reducers/auth.reducer'
import globalReducer from './redux/reducers/global.reducer'

const reducer = {
    auth: authReducer,
    global: globalReducer
}

const store = configureStore({
    reducer,
    devTools: true
})

export default store