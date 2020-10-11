const dotenv = require('dotenv');
const path = require('path');
const { readFileSync } = require('fs');
const ca = [readFileSync("rds-combined-ca-bundle.pem")];
dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
    mongo: {
      uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
    },
    readUserCollection : {
      node : "secondary",
      tags : [ { "dc": "replica1", "usage": "readUsers" } ]
    },
    readVisitorCollection : {
      node : "secondary",
      tags : [ { "dc": "replica2", "usage": "readVisitors" } ]
    },
    readConversationCollection : {
      node : "secondary",
      tags : [ { "dc": "primary", "usage": "readConversation" } ]
    },
    readAggregate : {
      node : "secondary",
      tags : [ { "dc": "replica3", "usage": "aggregate" } ]
    },
    sshConfig : {
      username: process.env.SSH_USERNAME,
      host: process.env.SSH_HOST,
      dstHost: process.env.DST_HOST,
      privateKey:readFileSync("demoec2.pem"),
      port: 22,
      dstPort: 27017,
      localHost: '127.0.0.1',
      localPort: 27018 //or anything else unused you want
    },
    mongoConOptions : {
      sslValidate: true,
      ssl: true,
      sslCA:ca,
      authMechanism: 'SCRAM-SHA-1',
      auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD
      },
      tlsAllowInvalidHostnames: true,
      tlsAllowInvalidCertificates: true,
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      serverSelectionTimeoutMS: 15000
    }
  };