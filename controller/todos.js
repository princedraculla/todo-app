import {db} from "../models/index.js";
const todoModel = db.Todos
const userModel = db.User


/**
 * indexig all todos for one user
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} - Json file all todos from Todo Model
 */
const allTodos = async (req, res) => {
  try {
    await todoModel.sync();
    //requirement for search 
    const { userId } = req.params;
    console.log(userId);
    const userAccess = await todoModel.findOne({
      where: {
        userId: Number(userId),
      },
    });
    if (!userAccess) {
      res.json({ msg: "you dont have task" });
      return;
    } else {
      const todosUser = await todoModel.findAll();
      return res.json({ message: todosUser }).status(200);
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: `error while listing data with message: ${error.message}` });
  }
};


/**
 * async function for creating task by user
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} message user for state of opration
 */
const createTodo = async (req, res) => {
  try {
    //requirement of creating todos
    const { userID } = req.params;
    const { title, content } = req.body;
    console.log(title, content);
    await todoModel.sync();
    await userModel.sync();
    const userAccess = await userModel.findOne({
      where: {
        id: Number(userID),
      },
    });
    if (!userAccess) {
      res
        .json({
          msg: "you dont have access pleas first check you have any Task...",
        })
        .status(404);
    } else {
      const createdTodo = await todoModel.create({
        title: title,
        content: content,
        userId: Number(userID),
      });
      console.log(createdTodo);
      res.json({ msg: `your data successfully saved ${title}` }).status(200);
    }
  } catch (error) {
    return res.status(500).json({
      msg: `error while creating todo by user with error: ${error.message}`,
    });
  }
};



/**
 * Async function for updating a specific task
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} message to user state of updating opration
 */
const updateTodo = async (req, res) => {
  try {
    // requirement of updating oprationf for todos
    const { userID } = req.params;
    const { isDone, title, content, id } = req.body;
    await todoModel.sync();
    const updatedTodo = await todoModel.update(
      {
        isDone: isDone,
        title: title,
        content: content,
      },
      {
        where: {
          userId: Number(userID),
          id: Number(id)
        },
      }
    );
    if (!updatedTodo) {
      return res
        .json({ msg: "your data is uncurrect please check the access" })
        .status(404);
    } else {
      return res
        .json({
          msg: `your data successfully updated with data: ${updatedTodo}`,
        })
        .status(200);
    }
  } catch (error) {
    return res.json({
      msg: `error while updating a todo with message ${error.message}`,
    });
  }
};


export {allTodos, createTodo, updateTodo}