import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const Admin = {
    userName: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASSWORD
}


/**
 * The function will check if the user name and password are valid, if they are valid, it will generate
 * a token and return it to the client
 * @param req - The request object.
 * @param res - The response object.
 * @returns - If user or pass is empty, return 401
 *     - If user or pass is not match, return 401
 *     - If user and pass is match, return 200 and token
 *     - If user and pass is match but something wrong, return 500
 */
const signin = (req, res) => {
    const { user, pass } = req.body

    if (!user || !pass ||
        user !== Admin.userName ||
        pass !== Admin.password) {
        res.status(200).json({
            statusCode: 401,
            accessToken: null,
            error: { message: 'Invalid user name or password!' }
        })
        return
    }

    if (user === Admin.userName || pass === Admin.password) {
        let token = jwt.sign({data: `${Admin.userName}-${Admin.password}`}, process.env.SECRET_JWT_TOKEN, {
            expiresIn: process.env.TOKEN_EXPIRED_TIME
        })

        res.status(200).json({
            data: { user, accessToken: token },
            statusCode: 200
        })
        return
    }

    res.status(200).json({
        statusCode: 500,
        error: { message: 'Internal Server Errors!' }
    })
}


export {
    signin
}