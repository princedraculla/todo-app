import dotenv from 'dotenv'
dotenv.config()
import { db } from '../models/index.js'
import  jwt from "jsonwebtoken";
import  bctypt from "bcrypt";
const User = db.User

const register = async (req, res) => {
  try {
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

const login = async (req, res) => {
  try {
    await User.sync();
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
    const validPassword = await bctypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.json({ msg: "incorrect email and password" }).status(404);
    }
    const token = jwt.sign({ id: user.id }, process.env.jwt_secret_key, {
      expiresIn: 60000000,
    });
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


export { register, login}