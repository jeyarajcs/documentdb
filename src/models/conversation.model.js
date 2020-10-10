const mongoose = require('mongoose');
const validator = require('validator');

/**
 * Conversation Schema
 */
const conversationSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true
    },
    users: [{
        userId : String,
        userType : {
            type: String,
            enum: ["user", "visitor"]
        }
    }],
    logs: [{
        message: String,
        senderId: String,
        timestamp: Date,
        senderType:{
            type: String,
            enum: ["user", "visitor"]
        }
    }],
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
 * @typedef Conversation
 */
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;