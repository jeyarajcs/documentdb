const httpStatus = require('http-status');
const { User } = require('../models/user.model');
const { readUserCollection } = require('../config/config');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUser = async (email, password, clientDb) => {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(clientDb);
    const UserModel = await db.model("User");
    const user = await UserModel.findUser(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new Error('Incorrect email or password');
    }
    const token = await user.generateToken();
    return token;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(userBody.clientDb);
    const User = await db.model("User");
    if (await User.isEmailTaken(userBody.email)) {
      throw new Error("Email Already Taken")
    }else{
        const user = await User.create(userBody);
        return user;
    }
  };

/**
 * 
 * @param {Object} req 
 * @description get all users
 * @author Jeyaraj
 */
const getAllUsers = async (req) => {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(req.query.clientDb);
    const UserModel = await db.model("User");
    const users = await UserModel.findUsers();
    return users;
};

/**
 * 
 * @param {String} userId 
 * @param {String} clientDb 
 * @description get user by _id
 */
const getUserById = async (userId, clientDb) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(clientDb);
  const UserModel = await db.model("User");
  const user = await UserModel.findUserById(userId);
  return user;
};

/**
 * 
 * @param {String} email 
 * @param {String} name 
 * @param {String} image 
 * @param {String} userId 
 * @param {String} clientDb 
 */
const updateUser = async (email, name, image, userId, clientDb) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(clientDb);
  const UserModel = await db.model("User");
  const user = await UserModel.update({_id:userId},{
    name:name,
    image: image
  }, {new:true});
  return user;
};

/**
 * 
 * @param {String} userId 
 * @param {String} clientDb 
 */
const deleteUser = async (userId, clientDb) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(clientDb);
  const UserModel = await db.model("User");
  const user = await UserModel.findOneAndDelete({_id:userId});
  return user;
};

module.exports = {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};