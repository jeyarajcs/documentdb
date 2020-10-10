const httpStatus = require('http-status');
const { Visitor } = require('../models');

/**
 * Create a Visitor
 * @param {Object} visitorBody
 * @returns {Promise<Visitor>}
 */
const createVisitor = async (visitorBody) => {
        const visitor = await Visitor.create(visitorBody);
        return visitor;
  };

module.exports = {
  createVisitor
};