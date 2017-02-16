/* LEAVE CASPER HERE !!! */
let csp = require("casper").create();

let { login, logout } = require("./_login");
let { info, warn, error } = require("./_messages");

function setupCasper() { 
  csp.on("remote.message", function cb(custom) {
    console.log("REMOTE: " + custom);
  });
  info("Hooks have been setup");
  return csp;
}

function processCommand() {
  let casper = setupCasper();
  let cmd = casper.cli.options.cmd;
  if (cmd === "get") {
    login(casper);
    logout(casper);
  }
}

/* processCommand();*/
info("Processing commands");
processCommand();
