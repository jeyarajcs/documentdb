const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { jwtSecret, jwtExpirationInterval, readUserCollection } = require('../config/config');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      }
    },
    image: {
      type: String,
      required: false
    },
    isActive:{
        type: Boolean,
        required: true,
        default: true
    }
  },
  {
    timestamps: true,
  }
);

/**
 * Check if email is taken already
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 * @description The data is being read from specific replica node as per configurations.
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } }).read(readUserCollection.node, readUserCollection.tags );
  return !!user;
};

/**
 * 
 * @param {String} email 
 * @description find user by email - The data is being read from specific replica node as per configurations.
 */
userSchema.statics.findUser = async function (email) {
  email = email ? {email} : {};
  try{
    const users = await this.findOne(email).read(readUserCollection.node, readUserCollection.tags );
    return users;
  }catch(err){
    return err;
  }
}

/**
 * @description Find all users - The data is being read from specific replica node as per configurations.
 */
userSchema.statics.findUsers = async function () {
  try{
    const users = await this.find({},{password:0}).read(readUserCollection.node, readUserCollection.tags );
    return users;
  }catch(err){
    return err;
  }
}

/**
 * 
 * @param {String} _id 
 * @description find user by id - The data is being read from specific replica node as per configurations.
 */
userSchema.statics.findUserById = async function (_id) {
  try{
    const users = await this.findOne({_id}).read(readUserCollection.node, readUserCollection.tags );
    return users;
  }catch(err){
    return err;
  }
}

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

/**
 * generate JWT after successful login
 * @returns {Promise<boolean>}
 */
userSchema.methods.generateToken = async function (password) {
  const user = this;
  const payload = {
      exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
      zusr : user.userId,
      zacc : user.accountId
  }
  return jwt.sign(payload, jwtSecret)
};

/**
 * Mongoose hook for Encrypt the password
 */
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;