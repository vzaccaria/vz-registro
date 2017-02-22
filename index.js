#!/usr/bin/env node
"use strict";

var _require = require("zaccaria-cli"),
    $d = _require.$d,
    $o = _require.$o,
    $fs = _require.$fs,
    $s = _require.$s,
    _ = _require._;

var color = require('chalk');

var getOptions = function getOptions(doc) {
  "use strict";

  var o = $d(doc);
  var help = $o("-h", "--help", false, o);
  var username = $o("-u", "--user", undefined, o);
  var password = $o("-p", "--password", undefined, o);
  var personnumber = $o("-n", "--person", undefined, o);
  var registro = $o("-r", "--registro", undefined, o);
  var datafile = $o("-f", "--file", undefined, o);
  var cmd = void 0;
  if (o.status) {
    cmd = "status";
  } else if (o.upload) {
    cmd = "upload";
  } else if (o.get) {
    cmd = "get";
  } else {
    cmd = "help";
  }
  return {
    help: help,
    username: username,
    password: password,
    registro: registro,
    datafile: datafile,
    personnumber: personnumber,
    cmd: cmd
  };
};

var runCasper = function runCasper(ags) {
  var txs = _.reduce(ags, function (result, v, key) {
    return result + " --" + key + "=" + v;
  }, "");
  var cmd = "casperjs " + __dirname + "/lib/_entry.js " + txs;
  warn(cmd);
  return $s.execAsync(cmd).then(function () {
    info("Execution finished");
  }, function (e) {
    error(e);
  });
};

var main = function main() {
  $fs.readFileAsync(__dirname + "/docs/usage.md", "utf8").then(function (it) {
    var opts = void 0;

    var _opts = opts = getOptions(it),
        cmd = _opts.cmd;

    switch (cmd) {
      case "HELP":
        console.log(it);
        break;
      default:
        runCasper(opts);
    }
    return 0;
  });
};

main();
