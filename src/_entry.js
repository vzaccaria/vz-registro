/* LEAVE CASPER HERE !!! */
let csp = require("casper").create({ waitTimeout: 20000 });
let { login, logout } = require("./_login");
let { openRegistro, readData, fillData } = require("./_registro");
let { runGet } = require("./_getdata.js");
let { info } = require("./_messages")("Entry");

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
  let data;
  switch (cmd) {
    case "get":
      login(casper);
      runGet(casper);
      logout(casper);
      break;
    case "status":
      login(casper);
      openRegistro(casper);
      logout(casper);
      break;
    case "upload":
      data = readData(casper);
      login(casper);
      openRegistro(casper);
      fillData(casper, data);
      logout(casper);
      break;
  }
}

/* processCommand();*/
info("Processing commands");
processCommand();
