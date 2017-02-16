#!/usr/bin/env node
/* eslint quotes: [0], strict: [0] */
"use strict";

var _require = require("zaccaria-cli");

var $d = _require.$d;
var $o = _require.$o;
var $fs = _require.$fs;
var $s
// $r.stdin() -> Promise  ;; to read from stdin
= _require.$s;

var _require2 = require("./lib/_messages");

var warn = _require2.warn;
var info = _require2.info;
var error = _require2.error;

var getOptions = function (doc) {
  "use strict";
  var o = $d(doc);
  var help = $o("-h", "--help", false, o);
  var user = $o("-u", "--user", undefined, o);
  var password = $o("-p", "--password", undefined, o);
  var registro = $o("-r", "--registro", undefined, o);
  var file = $o("-f", "--file", undefined, o);
  var status = o.status;
  var upload = o.upload;
  return {
    help: help,
    user: user,
    password: password,
    registro: registro,
    file: file,
    status: status,
    upload: upload
  };
};

var main = function () {
  $fs.readFileAsync(__dirname + "/docs/usage.md", "utf8").then(function (it) {
    var _getOptions = getOptions(it);

    var help = _getOptions.help;
    var user = _getOptions.user;
    var password = _getOptions.password;
    var registro = _getOptions.registro;
    var file = _getOptions.file;
    var status = _getOptions.status;
    var upload = _getOptions.upload;

    if (help) {
      console.log(it);
    } else if (status) {
      var cmd = "casperjs " + __dirname + "/lib/_status.js --username=" + user + " --password=" + password + " --registro=" + registro;
      warn(cmd);
      $s.execAsync(cmd).then(function () {
        info("file saved in status.png");
      });
    } else if (upload) {
      var cmd = "casperjs " + __dirname + "/lib/_upload.js --username=" + user + " --password=" + password + " --registro=" + registro + " --datafile=" + file;
      warn(cmd);
      $s.execAsync(cmd).then(function () {
        info("finished uploading");
      });
    }
  });
};

main();
