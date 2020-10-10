const mongoose = require('mongoose');
const { env, sshConfig, mongoConOptions } = require('./config');
const tunnel = require('tunnel-ssh');
mongoose.Promise = Promise;

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */

const initClientDbConnection = () => {
  tunnel(sshConfig, (error, server)=>{
    if(error){
      return("SSH connection error"+ error);
    }
    const db = mongoose.createConnection(`mongodb://${sshConfig.localHost}:${sshConfig.localPort}`, mongoConOptions);

    db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
    db.once("open", function() {
      console.log("client MongoDB Connection ok!");
      global.clientConnection = db;
    });
    // require("../models/user.model.js");
    // require("../models/visitor.model.js");
    // require("../models/conversation.model.js");
    return db;
  })
};

module.exports = {
  initClientDbConnection
};