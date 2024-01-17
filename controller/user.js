import  {db} from "../models/index.js"
const User = db.User




/**
 * async fondton for indexing all users for SuperUser
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} list of user if was success opration
 */
const allUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      return res.json({ user: users }).status(200);
    }
  } catch (error) {
    console.log(`error occured msg: ${error}`);
  }
};



/**
 * async function creating user same ass Register of AUth
 * @param {Request} req requirement of creating user data in DB
 * @param {Response} res 
 */
const createUser = async (req, res) => {
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



/**
 * async function fo deleting exist user
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params;
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


/**
 * may some User want changing theyre informaion
 * async function for updating informaion of user 
 *  >> changing password for more security concern
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} -> message for state of opration  
 */
const updateInfo = async (req, res) => {
  try {
    const userid = req.params;
    const { email, password } = req.body;
    const existeduser = await User.findByPk(Number(userid.id));
    if (existeduser) {
      if(email){
        existeduser.email = email
        await existeduser.save()
        res.json({msg: `email succesfully updated with ${email}`}).status(200)
      }
      if(password) {
        existeduser.password_hash = password
        await existeduser.save()
        res.json({msg: 'password succesfully save not hashed yet!'})
      }
    } else {
      return res.json({ msg: `with this id: ${userid.id} user not existed` }).status(404)
    }
  } catch (error) {
    res.json({
      msg: `error while updating info about user with error: ${error.message}`,
    });
  }
};


export {createUser, allUsers, deleteUser, updateInfo}