let chalk = require('chalk');

function warn(msg) {
  console.log(chalk.yellow("WARN: ") + msg);
}

function info(msg) {
  console.log(chalk.blue("INFO: ") + msg);
}

function error(msg) {
  console.log(chalk.red(" ERR: ") + msg); 
}

function iprefix(p) {
    return (m) => info(p + " » " + m);
}

function eprefix(p) {
    return (m) => error(p + " » " + m);
}

function wprefix(p) {
    return (m) => warn(p + " » " + m);
}

module.exports = { warn, info, error, iprefix, eprefix, wprefix};
