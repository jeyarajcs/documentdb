const { conversationService} = require('../services');
const uuid = require('uuid');


const createConversation = async (req, res) => {
  try{
    const conversation = await conversationService.createConversation(req.body);
    if(conversation){
      res.status(200).send({
        status:"success",
        message:"Conversation created successfully"
      });
    }
  }catch(e){
    res.status(400).send({
      status:"error",
      message : e.message
    })
  }
  
};


const getAllConversations = async (req, res)=> {
  try{
    const conversations = await conversationService.getAllConversations(req);
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
}

const getConversationById = async (req, res)=> {
  try{
    const conversationId = req.params.id;
    const clientDb = req.query.clientDb;
    const conversation = await conversationService.getConversationById(conversationId, clientDb);
    res.status(200).send({
      status:"success",
      message: conversation
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
}

const updateConversation = async (req, res)=> {
  try{
    const { clientDb } = req.body;
    const conversationId = req.params.id;
    const conversation = await conversationService.updateConversation(conversationId, req.body, clientDb);
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

const deleteConversation = async (req, res)=> {
  try{
    const conversationId = req.params.id;
    const { clientDb } = req.body;
    const conversation = await conversationService.deleteConversation(conversationId, clientDb);
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
  createConversation,
  getAllConversations,
  getConversationById,
  updateConversation,
  deleteConversation
};