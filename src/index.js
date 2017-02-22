let {
  $d,
  $o,
  $fs,
  $s,
  _
  // $r.stdin() -> Promise  ;; to read from stdin
} = require("zaccaria-cli");

let color = require('chalk');

let getOptions = doc => {
  "use strict";
  let o = $d(doc);
  let help = $o("-h", "--help", false, o);
  let username = $o("-u", "--user", undefined, o);
  let password = $o("-p", "--password", undefined, o);
  let personnumber = $o("-n", "--person", undefined, o);
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
    personnumber,
    cmd
  };
};

let runCasper = ags => {
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
  }, e => {
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
