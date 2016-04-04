let _ = require('../proxies/lodash')
let { warn, info, error } = require('./_messages')

let url_login = "http://www.polimi.it/intranet/"
let url_logout = "https://www.intranet.polimi.it/it/c/portal/logout"
let url_servizi = "http://www.polimi.it/servizionline"
let url_registro = (registro) => `https://www7.ceda.polimi.it/registro_didattica/PaginaPrincipaleRegistro.do?evn_=evento&id_registro=${registro}`

let viewport = {
    top: 0,
    left: 0,
    width: 1280,
    height: 1024
}

function captureFrame(name) {
    return function() {
        this.capture(name, viewport)
        info(`Saving ${name}`);
    }
}

function setupCasper(casperModule) {
    info("Setting up Casper")
    let casper = casperModule.create({
        verbose: true,
        timeout: 20 * 60000
    })

    casper.on('remote.message', (custom) =>
        console.log `REMOTE: ${custom}`)

    return casper
}


function login(casper) {
    let {
        username, password
    } = casper.cli.options;

    if (_.isUndefined(username) || _.isUndefined(password)) {
        console.log("Please insert username and password and number of registro")
        casper.exit()
    }
    casper.start(url_login, () => {
        info(`Logging into: ${url_login}`)
    })
    casper.then(function() {
        this.viewport(viewport.width, viewport.height)
    })
    casper.then(function() {
        this.waitForSelector("#login", () => {
            warn("Login form appeared!")
        })
    })

    casper.then(function() {
        this.fill("form", {
            login: username,
            password: password
        }, false);
        this.click('input[VALUE="Accedi"]')
        info("Fill username and password and click 'accedi'");
    })

    casper.waitForText("Servizi online")
    casper.thenOpen(url_servizi)
    casper.waitForText("011128")
    casper.then(function() {
        this.clickLabel("011128");
        warn("Entered, clicking current person number");
    })
}

function logout(casper) {
    casper.thenOpen(url_logout);
    casper.run(function() {
        info("Exiting!");
        casper.exit(0)
    })
}



module.exports = {
    login, logout, captureFrame, setupCasper
}
