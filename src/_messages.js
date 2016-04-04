let color = require('../proxies/chalk').set

let chalk = {
    yellow: function(s) {
        return color(s, "yellow")
    },
    blue: function(s) {
        return color(s, "blue")
    },
    red: function(s) {
        return color(s, "red")
    }
}

function warn(msg) {
        console.error(chalk.yellow('WARN: ') + msg);
}

function info(msg) {
        console.error(chalk.blue('INFO: ') + msg);
}

function error(msg) {
        console.error(chalk.red(' ERR: ') + msg);
}

module.exports = { warn, info, error }
