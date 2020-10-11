const { Conversation } = require('../models');

  /**
 * Create a conversation
 * @param {Object} conversationBody
 * @returns {Promise<Conversation>}
 */
const createConversation = async (conversationBody) => {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(conversationBody.clientDb);
    const Conversation = await db.model("Conversation");
    const conversation = await Conversation.create(conversationBody);
    return conversation;
    }
  
  /**
   * 
   * @param {Object} req 
   * @description get all conversations
   * @author Jeyaraj
   */
  const getAllConversations = async (req) => {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(req.query.clientDb);
    const ConversationModel = await db.model("Conversation");
    const conversations = await ConversationModel.findConversations();
    return conversations;
  };
  
  /**
   * 
   * @param {String} conversationId 
   * @param {String} clientDb 
   * @description get conversation by _id
   */
  const getConversationById = async (conversationId, clientDb) => {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(clientDb);
    const ConversationModel = await db.model("Conversation");
    const conversation = await ConversationModel.findConversationById(conversationId);
    return conversation;
  };
  
  /**
   * 
   * @param {String} conversationId 
   * @param {Object} data 
   * @param {String} clientDb 
   */
  const updateConversation = async (conversationId, data, clientDb) => {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(clientDb);
    const ConversationModel = await db.model("Conversation");
    const conversation = await ConversationModel.update({_id:conversationId},data, {new:true});
    return conversation;
  };
  
  /**
   * 
   * @param {String} conversationId 
   * @param {String} clientDb 
   * @description delete conversation
   */
  const deleteConversation = async (conversationId, clientDb) => {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(clientDb);
    const ConversationModel = await db.model("Conversation");
    const conversation = await ConversationModel.deleteOne({_id:conversationId});
    return conversation;
  };
  
  
  module.exports = {
    createConversation,
    getAllConversations,
    getConversationById,
    updateConversation,
    deleteConversation
  };