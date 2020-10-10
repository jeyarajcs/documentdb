const { conversationService} = require('../services');
const uuid = require('uuid');

/**
 * 
 * @param {Object} req.body name, users, logs
 * @param {Object} res 
 * @description Create conversation
 * @requires req.body
 * @version 1.0.0
 * @author Jeyaraj
 */
const createConversation = async (req, res) => {
  try{
    const conversation = await conversationService.createConversation(req.body);
    if(conversation){
      res.status(200).send({
        status:"success",
        message:conversation
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
 * @param {Object} 
 * @param {Object} res 
 * @description get conversations
 * @version 1.0.0
 * @author Jeyaraj
 */
const getConversations = async (req, res) => {
  try{
    const conversations = await conversationService.getConversations();
    res.status(200).send({
      status:"success",
      message: conversations
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
};


module.exports = {
    createConversation,
    getConversations
};