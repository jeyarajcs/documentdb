const { visitorService } = require('../services');
const uuid = require('uuid');

/**
 * 
 * @param {Object} req.body  name, email, image, company 
 * @param {Object} res
 * @description To create a visitor
 * @version 1.0.0
 * @author Jeyaraj
 */
const createVisitor = async (req, res) => {
  try{
    const visitor = await visitorService.createVisitor(req.body);
    if(visitor){
      res.status(200).send({
        status:"success",
        message:"Visitor created successfully"
      });
    }
  }catch(e){
    res.status(400).send({
      status:"error",
      message : e.message
    })
  }
  
};


const getAllVisitors = async (req, res)=> {
  try{
    const visitors = await visitorService.getAllVisitors(req);
    res.status(200).send({
      status:"success",
      message: visitors
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
}

const getVisitorById = async (req, res)=> {
  try{
    const visitorId = req.params.id;
    const clientDb = req.query.clientDb;
    const visitor = await visitorService.getVisitorById(visitorId, clientDb);
    res.status(200).send({
      status:"success",
      message: visitor
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
}

const updateVisitor = async (req, res)=> {
  try{
    const { clientDb } = req.body;
    const visitorId = req.params.id;
    const visitor = await visitorService.updateVisitor(visitorId, req.body, clientDb);
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

const deleteVisitor = async (req, res)=> {
  try{
    const visitorId = req.params.id;
    const { clientDb } = req.body;
    const visitor = await visitorService.deleteVisitor(visitorId, clientDb);
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

const getCompanyWiseCount = async (req, res)=> {
  try{
    const count = await visitorService.getCompanyWiseCount(req);
    res.status(200).send({
      status:"success",
      message: count
    });
  }catch(e){
    res.status(400).send({
      status:"error",
      message: e.message
    })
  }
}

module.exports = {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
  getCompanyWiseCount
};