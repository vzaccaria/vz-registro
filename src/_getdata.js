// Casper should be required at the top level module, dont ask me why..

let { iprefix, wprefix } = require("./_messages.js");
let { captureFrame } = require("./_login.js");

let info = iprefix("Attività didattiche");
let warn = wprefix("Attività didattiche");

function openProve(casper) {
  info("Hooking up actions for scan");
  casper.waitForText("Incarichi");
  casper.then(function() {
    this.clickLabel("Incarichi e attività didattiche");
  });
  var label = "Prove ed elenco";
  casper.waitForText(label, function() {
    warn("'Elenco iscritti' appeared!");
    this.clickLabel("Prove ed elenco iscritti alle prove");
    info("Click it and grabbing screenshot in status.png");
  });
  casper.then(captureFrame("status.png"));
}

function runGet(casper) {
  openProve(casper);
}

module.exports = { runGet };
