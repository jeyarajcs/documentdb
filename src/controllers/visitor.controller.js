const { visitorService } = require('../services');
const uuid = require('uuid');

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @description Create Visitor
 * @requires req.body
 * @version 1.0.0
 * @author Jeyaraj
 */
const createVisitor = async (req, res) => {
  try{
    const visitor = await visitorService.createVisitor(req.body);
    if(visitor){
      res.status(200).send({
        status:"success",
        message:visitor
      });
    }
  }catch(e){
    res.status(400).send({
      status:"error",
      message : e.message
    })
  }
  
};

module.exports = {
  createVisitor
};