const mongoose = require('mongoose');
const validator = require('validator');
const { readConversationCollection } = require('../config/config');

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
        timestamp: Number,
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
 * @description Find all conversations - The data is being read from specific replica node as per configurations.
 */
conversationSchema.statics.findConversations = async function () {
  try{
    const conversations = await this.find({}).read(readConversationCollection.node, readConversationCollection.tags );
    return conversations;
  }catch(err){
    return err;
  }
}

/**
 * 
 * @param {String} _id 
 * @description find conversation by id - The data is being read from specific replica node as per configurations.
 */
conversationSchema.statics.findConversationById = async function (_id) {
  try{
    const conversation = await this.findOne({_id}).read(readConversationCollection.node, readConversationCollection.tags );
    return conversation;
  }catch(err){
    return err;
  }
}



/**
 * @typedef Conversation
 */
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;