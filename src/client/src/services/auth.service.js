import axios from 'axios'

const API_URL = 'http://localhost:4000/auth/'

/**
 * It takes a username and password, sends them to the API, and if the API returns an access token, it
 * saves it to local storage
 * @param username - The username of the user
 * @param password - The password of the user.
 * @returns The response.data is being returned.
 */
const login = (username, password) => {
    return axios
        .post(API_URL + 'signin', {
            user: username,
            pass: password
        })
        .then((response) => {
            if (response.data?.data?.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data?.data))
            }

            return response.data
        })
}

/**
 * It removes the user from local storage
 */
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    login,
    logout,
}

export default authService