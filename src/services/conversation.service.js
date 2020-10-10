const mongoose = require('mongoose');
const { Conversation } = require('../models');
const uuid = require('uuid');

/**
 * 
 * @param {Object} conversationFilter
 * @returns {Promise<Conversations>}
 * @description Get conversations.
 */
const getConversations = async () => {
    const conversations = await Conversation.find({});
    return conversations;
};

/**
 * 
 * @param {Object} conversationBody
 * @returns {Promise<conversation>}
 * @description Create a conversation
 */
const createConversation = async (conversationBody) => {
    const conversation = await Conversation.create(conversationBody);
    return conversation;
};

module.exports = {
    getConversations,
    createConversation
};