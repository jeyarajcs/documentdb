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
    req.body.clientDb  = req.headers["x-key-db"];
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
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
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

module.exports = {
  register,
  login
};