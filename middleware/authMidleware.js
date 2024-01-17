import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

/**
 * function of authentication middleware 
 * checking user is authenticate or not
 * @param {Request} req - request from express
 * @param {Response} res - response from express
 * @returns {Response} -returnin message to user is valid or not
 */
function verifyToken (req,res) {
    const token = req.header('Authorization')
    if(!token) {
        return res.json({msg: `need to authenticate for user if not first register`}).status(401)
    }
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret_key )
        req.userId = decoded.userId
    } catch (error) {
        return res.json({error: error.message}).json(401)
    }
}


export default verifyToken;