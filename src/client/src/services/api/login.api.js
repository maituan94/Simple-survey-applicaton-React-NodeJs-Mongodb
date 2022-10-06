import AuthService from '../auth.service'

/**
 * It calls the login API, and if the API call is successful, it returns the user object, otherwise it
 * returns an error
 * @param thunkAPI - This is the thunk API object that contains the following properties:
 * @returns An object with a user property.
 */
const loginAPI = async ({ username, password }, thunkAPI) => {
    try {
        const data = await AuthService.login(username, password)
        if (data.statusCode === 200) return { user: data?.data || {} }
        return thunkAPI.rejectWithValue()
    } catch (error) {
        return thunkAPI.rejectWithValue()
    }
}

/**
 * It calls the logout function from the AuthService, which removes the token from local storage and
 * redirects the user to the login page
 */
const logOut = async () => {
    await AuthService.logout()
}

export {
    loginAPI,
    logOut
}