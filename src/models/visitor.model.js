const mongoose = require('mongoose');
const validator = require('validator');

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
 * @typedef Visitor
 */
const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;