import dotenv from "dotenv";
dotenv.config();
import { db } from "../models/index.js";
import jwt from "jsonwebtoken";
import bctypt from "bcrypt";
const User = db.User;
/**
 * function for registring user in our app
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON} - message for user,opration its successfully or not
 */
const register = async (req, res) => {
  try {
    /**
     * getting requirment fields from request Body
     *  saving it in User Model
     */
    const { name, password, email } = req.body;
    await User.sync();
    const existedUser = await User.findOne({
      where: { email },
    });
    if (existedUser) {
      return res.json({
        msg: `this email : ${existedUser.email} already registered peek another one`,
      });
    }
    /**
     * variable contains hashed password becouse of security
     */
    const hashedPassword = await bctypt.hash(password, 15);
    await User.create({
      name: name,
      password_hash: hashedPassword,
      email: email,
    });
    return res.json({ msg: `${name}: user registered` }).status(200);
  } catch (error) {
    return res.json({
      msg: `some error while registring. msg: ${error.message}`,
    });
  }
};

/**
 * for login user into app
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON} // message to user for valid data and successfully opration of login
 */
const login = async (req, res) => {
  try {
    //syncronizing User model for intracting with data in database
    await User.sync();
    // requirment for checking if registered or not
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res
        .json({ msg: `this email: ${email} does not exist` })
        .status(404);
    }
    /**
     * comparing passord insereted with existed 
     */
    const validPassword = await bctypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.json({ msg: "incorrect email and password" }).status(404);
    }
    // after if statement genetating token for user
    const token = jwt.sign({ id: user.id }, process.env.jwt_secret_key, {
      expiresIn: 60000000,
    });
    // successfully Response to user for information they need
    return res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    return res.json({
      msg: `error while loging user with message: ${error.message}`,
    });
  }
};

export { register, login };
