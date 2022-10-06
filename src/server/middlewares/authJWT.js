import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

/**
 * It checks if the request has a token, if it doesn't, it returns a 401 error. If it does, it verifies
 * the token and if it's valid, it adds the decoded token to the request object and calls the next
 * function
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a callback function that will be called when the middleware is done.
 */
const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    console.log(token)
    if (!token) {
        return res.status(200).json({
            statusCode: 401,
            error: { message: "No token provided!" }
        });
    }

    jwt.verify(token, process.env.SECRET_JWT_TOKEN, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(200).json({
                statusCode: 401,
                error: { message: "Unauthorized!" }
            });
        } 
        req.user = decoded.data;
            next();
    });
}

export {
    verifyToken
};