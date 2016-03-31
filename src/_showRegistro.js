let url_login = "http://www.polimi.it/intranet/"
let url_logout = "https://www.intranet.polimi.it/it/c/portal/logout"
let url_servizi = "http://www.polimi.it/servizionline"
let url_registro = (registro) => `https://www7.ceda.polimi.it/registro_didattica/PaginaPrincipaleRegistro.do?evn_=evento&id_registro=${registro}`

function captureFrame(name) {
    return function() {
        this.capture(name, {top: 0, left: 0, width: 1600, height: 768 })
    }
}

function setupCasper() {
    let casper = require('casper').create({
        verbose: true,
        timeout: 20 * 60000
    })

    casper.on('remote.message', (custom) =>
              console.log `REMOTE: ${custom}`)

    return casper
}

function login(casper) {
    casper.start(url_login, () => console.log(`Loggin into: ${url_login}`))
    casper.then(function() {
        this.waitForSelector("#login", () => {
            console.log("Found!")
        })
    })
    casper.then(captureFrame("loginPage.png"))
    casper.thenOpen(url_logout);
    casper.run(function() {
        this.die("Bye!")
    })
}

let casper = setupCasper()
login(casper)
