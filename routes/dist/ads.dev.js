"use strict";

var express = require("express");

var router = express.Router();
router.get("/form", function (req, res, next) {
  res.sendFile('/template/dist/form.html', {
    root: __dirname
  }); // res.sendFile(__dirname + "/template/dist/form.html");
});
router.post("/vendor", function (req, res, next) {
  res.send({
    message: "message"
  }); // res.sendFile(__dirname + "/template/dist/form.html");
});
module.exports = router;
//# sourceMappingURL=ads.dev.js.map
