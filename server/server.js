// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || '5001';
const UI_DIST_FOLDER = path.join(__dirname, '../ui/dist');

// Get our routes
const api = require('./routes/api');
var logger = require('./services/logger-service');
const app = express();

module.exports = {
  start: function () {

    // Parsers for POST data
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());

    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use('/api', api);

    // Point static path to dist
    app.use(express.static(UI_DIST_FOLDER));
    //Catch all other routes and return the index file
    app.get('*', (req, res) => {
      res.sendFile(path.join(UI_DIST_FOLDER, 'index.html'));
    });
    
    app.set('port', PORT);
    const server = http.createServer(app);
    
    logger.init();
    
    server.listen(PORT, () => {
      logger.log(`Server started on ${PORT}`)
    });

  }
}