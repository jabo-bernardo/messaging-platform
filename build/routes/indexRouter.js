"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var router = new _express.Router();

router.get("/", function (req, res) {
    res.logger.log("Hello :D");
    res.render("index");
});

exports.default = router;