/**
 * If the user is logged in, return the access token, otherwise return an empty object
 * @returns an object with a key of authorization and a value of the user's accessToken.
 */
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.accessToken) {
    return { authorization: user?.accessToken }

  } else {
    return {}
  }
}