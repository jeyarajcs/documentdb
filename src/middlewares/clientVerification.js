const clients = ["insent", "zebpay", "lenovo", "hp"];
/**
 * 
 * @param {Object} req req.body or req.query 
 * @param {String} res Client/Customer validation for DB Separation. 
 * @param {function} next 
 * @description This is a middleware function to verify the Customer DB when passing through the API routes.
 * @version 1.0.0
 * @author Jeyaraj
 */
const verifyClient = async (req, res, next) => {
    const clientDB = req.body['x-client-key'] || req.query['x-client-key'] || req.headers['x-client-key'];
    if(clientDB && clients.includes(clientDB)){
        if (Object.keys(req.body).length > 0) {
            req.body.clientDb = clientDB+"dbscrt";
        } else {
            req.query.clientDb = clientDB+"dbscrt";
        }
      next();
    }else{
        res.status(403).send({status:"error", message:"Not valid customer."});
    }
  
  }
  
  module.exports = {
    verifyClient,
  };