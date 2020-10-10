const { port, env } = require('./config/config');
const app = require('./config/expressApp');
const mongo = require('./config/db');

// create mongoose connection
mongo.initClientDbConnection();

// listen to requests
app.listen(process.env.PORT || port, () => console.log(`server started on port ${process.env.PORT || port} (${env})`));