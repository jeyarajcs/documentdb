const { userService} = require('../services');
const uuid = require('uuid');

/**
 * 
 * @param {Object} req.body  name, email, password 
 * @param {Object} res
 * @description To create a user
 * @version 1.0.0
 * @author Jeyaraj
 */
const register = async (req, res) => {
  try{
    const user = await userService.createUser(req.body);
    if(user){
      res.status(200).send({
        status:"success",
        message:"User created successfully"
      });
    }
  }catch(e){
    res.status(400).send({
      status:"error",
      message : e.message
    })
  }
  
};

/**
 * 
 * @param {Object} req.body email, password 
 * @param {Object} res
 * @description Login user. The response will give the JWT, 
 * and the same could be used for further API calls by providing x-access-token at http header.
 * @version 1.0.0
 * @author Jeyaraj
 */
const login = async (req, res) => {
  try{
    const { email, password, clientDb } = req.body;
    const user = await userService.loginUser(email, password, clientDb);
    res.status(200).send({
      status:"success",
      message: "Successfully Logged In",
      token : user
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
};

const getAllUsers = async (req, res)=> {
  try{
    const users = await userService.getAllUsers(req);
    res.status(200).send({
      status:"success",
      message: users
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
}
const getUserById = async (req, res)=> {
  try{
    const userId = req.params.id;
    const clientDb = req.query.clientDb;
    const user = await userService.getUserById(userId, clientDb);
    res.status(200).send({
      status:"success",
      message: user
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
}
const updateUser = async (req, res)=> {
  try{
    const { email, name, image, clientDb } = req.body;
    const userId = req.params.id;
    const user = await userService.updateUser(email, name, image, userId, clientDb);
    res.status(200).send({
      status:"success",
      message: "Successfully Updated"
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
}
const deleteUser = async (req, res)=> {
  try{
    const userId = req.params.id;
    const { clientDb } = req.body;
    const user = await userService.deleteUser(userId, clientDb);
    res.status(200).send({
      status:"success",
      message: "Successfully Deleted"
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
}


module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};