// Casper should be required at the top level module, dont ask me why..


function openProve(casper) {
  info("Scheduling 'openProve'");
  casper.waitForText("Incarichi");
  casper.then(function() {
    this.clickLabel("Incarichi e attività didattiche");
  });
  var label = "Prove ed elenco";
  casper.waitForText(label, function() {
    warn("Elenco iscritti appeared!");
    this.clickLabel("Prove ed elenco iscritti alle prove");
  });
  casper.then(captureFrame("status.png"));
}

function runGet(casper) {
    openProve(casper);
}

