import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config
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