'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _figlet = require('figlet');

var _figlet2 = _interopRequireDefault(_figlet);

var _logger = require('./modules/logger');

var _logger2 = _interopRequireDefault(_logger);

var _indexRouter = require('./routes/indexRouter');

var _indexRouter2 = _interopRequireDefault(_indexRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'production') {
    _dotenv2.default.config();
}

var logger = new _logger2.default();

/* Application */
var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var socket = (0, _socket2.default)(_http2.default);

/* Application Configuration */
app.use((0, _cors2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", _path2.default.join(__dirname, "views"));

/* Overrides */
app.response.logger = logger;

/* Middleware Logger */
// app.use((req, res, next) => {
//     logger.info(req.rawHeaders.join(" "));
//     next();
// });

socket.on("connection", function (socket) {
    console.log('[' + socket.id + '] connected to the server.');
});

/* Router Definitions */


/* Router Links */
app.use("/", _indexRouter2.default);

/* Server Initializations */
var PORT = process.env.PORT || 8080;
app.response.logger.info('Attempting to connect to port ' + PORT);
server.listen(PORT, function () {
    return (0, _figlet2.default)('Listening to ' + PORT, function (err, res) {
        if (err) throw err;
        logger.log('\n' + res);
    });
});