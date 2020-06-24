'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);

        this.TYPE = {
            Log: 0,
            Info: 1,
            Success: 2,
            Error: 3
        };
    }

    _createClass(Logger, [{
        key: '$',
        value: function $(content, type) {
            var timestamp = (0, _moment2.default)().format("YYYY/MM/DD HH:mm:ss");
            switch (type) {
                case this.TYPE.Log:
                    console.log('<' + timestamp + '> || ' + _chalk2.default.bgBlue.black(' ' + content + ' '));
                    break;
                case this.TYPE.Info:
                    console.log('<' + timestamp + '> || ' + _chalk2.default.bgYellow.black(' ' + content + ' '));
                    break;
                case this.TYPE.Success:
                    console.log('<' + timestamp + '> || ' + _chalk2.default.bgGreen.black(' ' + content + ' '));
                    break;
                case this.TYPE.Error:
                    console.log('<' + timestamp + '> || ' + _chalk2.default.bgRed.black(' ' + content + ' '));
                    break;
            }
            _fs2.default.appendFile(_path2.default.join(__dirname, '../logs/' + timestamp.replace(/\//g, "-").slice(0, 13) + '.log'), '<' + timestamp + '> || ' + content + ' \n', function (err) {
                if (err) throw err;
            });
        }
    }, {
        key: 'log',
        value: function log(content) {
            this.$(content, this.TYPE.Log);
        }
    }, {
        key: 'info',
        value: function info(content) {
            this.$(content, this.TYPE.Info);
        }
    }, {
        key: 'success',
        value: function success(content) {
            this.$(content, this.TYPE.Sucess);
        }
    }, {
        key: 'error',
        value: function error(content) {
            this.$(content, this.TYPE.Error);
        }
    }]);

    return Logger;
}();

exports.default = Logger;