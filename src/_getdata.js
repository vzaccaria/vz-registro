// Casper should be required at the top level module, dont ask me why..

let { info, warn } = require("./_messages.js")("Get Data");
let { captureFrame } = require("./_login.js");

function openProve(casper) {
  info("Hooking up actions for scan");
  casper.then(() => {
    info("Waiting for Incarichi e attività");
    casper.then(captureFrame("waiting.png"));
  });
  casper.waitForText("Incarichi e attività didattiche");
  casper.then(function() {
    info("Clicking incarichi");
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
