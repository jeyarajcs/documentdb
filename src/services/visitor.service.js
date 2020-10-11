const httpStatus = require('http-status');
const { Visitor } = require('../models');
const { readAggregate } = require('../config/config');

  /**
 * Create a visitor
 * @param {Object} visitorBody
 * @returns {Promise<Visitor>}
 */
const createVisitor = async (visitorBody) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(visitorBody.clientDb);
  const Visitor = await db.model("Visitor");
  const visitor = await Visitor.create(visitorBody);
  return visitor;
  }

/**
 * 
 * @param {Object} req 
 * @description get all visitors
 * @author Jeyaraj
 */
const getAllVisitors = async (req) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(req.query.clientDb);
  const VisitorModel = await db.model("Visitor");
  const visitors = await VisitorModel.findVisitors();
  return visitors;
};

/**
 * 
 * @param {String} visitorId 
 * @param {String} clientDb 
 * @description get visitor by _id
 */
const getVisitorById = async (visitorId, clientDb) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(clientDb);
  const VisitorModel = await db.model("Visitor");
  const visitor = await VisitorModel.findVisitorById(visitorId);
  return visitor;
};

/**
 * 
 * @param {String} visitorId 
 * @param {Object} data 
 * @param {String} clientDb 
 */
const updateVisitor = async (visitorId, data, clientDb) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(clientDb);
  const VisitorModel = await db.model("Visitor");
  const visitor = await VisitorModel.update({_id:visitorId},data, {new:true});
  return visitor;
};

/**
 * 
 * @param {String} visitorId 
 * @param {String} clientDb 
 * @description delete visitor
 */
const deleteVisitor = async (visitorId, clientDb) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(clientDb);
  const VisitorModel = await db.model("Visitor");
  const visitor = await VisitorModel.deleteOne({_id:visitorId});
  return visitor;
};

/**
 * 
 * @param {Object} req 
 * @description Aggrgate for get company wise count
 */
const getCompanyWiseCount = async (req) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(req.query.clientDb);
  const VisitorModel = await db.model("Visitor");
  const visitor = await VisitorModel.aggregate([
    {
      $group:{_id:"$company", count:{$sum:1}}
    }
  ]).read(readAggregate.node, readAggregate.tags );
  return visitor;
};

module.exports = {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
  getCompanyWiseCount
};