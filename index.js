#!/usr/bin/env node
"use strict";

var _require = require("zaccaria-cli"),
    $d = _require.$d,
    $o = _require.$o,
    $fs = _require.$fs,
    $s = _require.$s,
    _ = _require._;

var ANSI_CODES = {
  "off": 0,
  "bold": 1,
  "italic": 3,
  "underline": 4,
  "blink": 5,
  "inverse": 7,
  "hidden": 8,
  "black": 30,
  "red": 31,
  "green": 32,
  "yellow": 33,
  "blue": 34,
  "magenta": 35,
  "cyan": 36,
  "white": 37,
  "black_bg": 40,
  "red_bg": 41,
  "green_bg": 42,
  "yellow_bg": 43,
  "blue_bg": 44,
  "magenta_bg": 45,
  "cyan_bg": 46,
  "white_bg": 47
};

var color = function color(str, _color) {
  if (!_color) return str;

  var color_attrs = _color.split("+");
  var ansi_str = "";
  for (var i = 0, attr; attr = color_attrs[i]; i++) {
    ansi_str += "\x1B[" + ANSI_CODES[attr] + "m";
  }
  ansi_str += str + "\x1B[" + ANSI_CODES["off"] + "m";
  return ansi_str;
};

var chalk = {
  yellow: function yellow(s) {
    return color(s, "yellow");
  },
  blue: function blue(s) {
    return color(s, "blue");
  },
  red: function red(s) {
    return color(s, "red");
  }
};

function warn(msg) {
  console.error(chalk.yellow("WARN: ") + msg);
}

function info(msg) {
  console.error(chalk.blue("INFO: ") + msg);
}

function error(msg) {
  console.error(chalk.red(" ERR: ") + msg);
}

var getOptions = function getOptions(doc) {
  "use strict";

  var o = $d(doc);
  var help = $o("-h", "--help", false, o);
  var username = $o("-u", "--user", undefined, o);
  var password = $o("-p", "--password", undefined, o);
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
