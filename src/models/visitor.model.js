const mongoose = require('mongoose');
const validator = require('validator');
const { readVisitorCollection } = require('../config/config');

const visitorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    company:{
      type: String,
      required : false
    },
    isActive: {
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
 * @description Find all visitors - The data is being read from specific replica node as per configurations.
 */
visitorSchema.statics.findVisitors = async function () {
  try{
    const visitors = await this.find({}).read(readVisitorCollection.node, readVisitorCollection.tags );
    return visitors;
  }catch(err){
    return err;
  }
}

/**
 * 
 * @param {String} _id 
 * @description find visitor by id - The data is being read from specific replica node as per configurations.
 */
visitorSchema.statics.findVisitorById = async function (_id) {
  try{
    const visitor = await this.findOne({_id}).read(readVisitorCollection.node, readVisitorCollection.tags );
    return visitor;
  }catch(err){
    return err;
  }
}

/**
 * @typedef Visitor
 */
const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;