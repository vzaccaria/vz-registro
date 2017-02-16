let {
  $d,
  $o,
  $fs,
  $s,
  _
  // $r.stdin() -> Promise  ;; to read from stdin
} = require("zaccaria-cli");

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

var color = function(str, color) {
    if(!color) return str;

    var color_attrs = color.split("+");
    var ansi_str = "";
    for(var i=0, attr; attr = color_attrs[i]; i++) {
        ansi_str += "\u001b[" + ANSI_CODES[attr] + "m";
    }
    ansi_str += str + "\u001b[" + ANSI_CODES["off"] + "m";
    return ansi_str;
};

var chalk = {
  yellow: function(s) {
    return color(s, "yellow");
  },
  blue: function(s) {
    return color(s, "blue");
  },
  red: function(s) {
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



let getOptions = doc => {
  "use strict";
  let o = $d(doc);
  let help = $o("-h", "--help", false, o);
  let username = $o("-u", "--user", undefined, o);
  let password = $o("-p", "--password", undefined, o);
  let registro = $o("-r", "--registro", undefined, o);
  let datafile = $o("-f", "--file", undefined, o);
  let cmd;
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
    help,
    username,
    password,
    registro,
    datafile,
    cmd
  };
};

let runCasper = (ags) => {
  let txs = _.reduce(
    ags,
    (result, v, key) => {
      return `${result} --${key}=${v}`;
    },
    ""
  );
  let cmd = `casperjs ${__dirname}/lib/_entry.js ${txs}`;
  warn(cmd);
  return $s.execAsync(cmd).then(() => {
    info("Execution finished");
  }, (e) => {
      error(e);
  });
};

let main = () => {
  $fs.readFileAsync(__dirname + "/docs/usage.md", "utf8").then(it => {
    let opts;
    let {
      cmd
    } = opts = getOptions(it);
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
