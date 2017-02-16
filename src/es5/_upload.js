// Casper should be required at the top level module, dont ask me why..
let casperModule = require("casper");

let { setupCasper, login, logout } = require("./_login");
let { openRegistro, readData, fillData } = require("./_registro");

let casper = setupCasper(casperModule);

login(casper);
openRegistro(casper);
fillData(casper, readData(casper));
logout(casper);
