const models = require("../models");
const User = models.sequelize.models.User;
const sequelize = models.sequelize;
exports.allUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (users) {
      return res.json({ user: users }).status(200);
      console.log(users.length);
    }
  } catch (error) {
    console.log(`error occured msg: ${error}`);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const createdUser = await User.create({
      name: userName,
      password_hash: password,
      email: email,
    }).then((createObject) => {
      res
        .json({
          message: `user with this name: ${userName} created to DataBase`,
        })
        .status(200);
    });
  } catch (error) {
    console.log(`error for creating user msg: ${error}`);
    res.sendStatus(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params;
    console.log(userId);
    const deleteduser = await User.destroy({
      where: {
        id: Number(userId.id),
      },
    });
    if (deleteduser) {
      res.json({ msg: `your account succesfully deleted` }).status(200);
    } else {
      res.json({ msg: `you dont have account or this id is not exists` });
    }
  } catch (error) {
    res.json({ msg: `error while deleting message: ${error.message}` });
  }
};

exports.updateInfo = async (req, res) => {
  try {
    const userid = req.params;
    const { email, password } = req.body;
    const existeduser = await User.findByPk(Number(userid.id));
    if (existeduser) {
      const updateduser = await User.update
    } else {
      return res.json({ msg: `with this id: ${userid.id} user not existed` }).status(404)
    }
  } catch (error) {
    res.json({
      msg: `error while updating info about user with error: ${error.message}`,
    });
  }
};
