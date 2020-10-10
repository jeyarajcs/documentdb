const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

/**
 * 
 * @param {Object} req req.body or req.query 
 * @param {String} res Token validation messages or respective API response. 
 * @param {function} next 
 * @description This is a middleware function to verify the JWT when passing through the API routes.
 * @version 1.0.0
 * @author Jeyaraj
 */
const verifyToken = async (req, res, next) => {
  const jwttoken = req.body.jwttoken || req.query.jwttoken || req.headers['x-access-token'];
  if(jwttoken){
      jwt.verify(jwttoken, jwtSecret, (err, decoded)=>{
          if(err){
            res.status(403).send({status:"error", message:"Failed to authenticate token."});
          }else{
                if (Object.keys(req.body).length > 0) {
                    req.body.createdBy = decoded.zusr;
                } else {
                    req.query.createdBy = decoded.zusr;
                }
              next();
          }
      });
  }else{
      res.status(403).send({status:"error", message:"No token provided."});
  }

}

module.exports = {
    verifyToken,
};