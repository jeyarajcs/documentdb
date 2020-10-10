const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const routes = require('../routes');

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// ---- SERVE STATIC FILES ---- //
app.use(function(req, res, next) {
  next();
}, express.static("public"));

// enable cors
app.use(cors());
app.options('*', cors());

// api routes
app.use('/api/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    res.status(404).send({
        status:"error",
        message: "Not found"
    })
  next();
});

module.exports = app;