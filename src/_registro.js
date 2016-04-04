let _ = require('../proxies/lodash')
let { captureFrame } = require('./_login')
let url_registro = (registro) => `https://www7.ceda.polimi.it/registro_didattica/PaginaPrincipaleRegistro.do?evn_=evento&id_registro=${registro}`
let url_form     = (registro, mese, anno) => `https://www7.ceda.polimi.it/registro_didattica/NuovaRiga.do?evn_=evento&id_registro=${registro}&mese=${mese}/${anno}`

let url_report = (registro) => `https://www7.ceda.polimi.it/registro_didattica/ReportConsuntivo.do?evn_=evento&id_registro=${registro}`

let { warn, info, error } = require('./_messages')

function sanitizeData(data) {
    data = _.pick(data, [
        'data_lezione_month'
        , 'data_lezione_year'
        , 'data_lezione_day'
        , 'sede'
        , 'c_aula'
        , 'c_forma_didattica'
        , 'inizio_ore'
        , 'inizio_ore_min'
        , 'termine_ore'
        , 'termine_ore_min'
        , 'n_ore_lez'
        , 'n_ore_lez_min'
        , 'docente'
        , 'docente_ospite'
        , 'contenuto'
    ])

    if(data.docente === 'N')
        delete data.docente_ospite

    return data;
}

function fillForm(casper, registro, datum) {
    casper.thenOpen(url_form(registro, datum.data_lezione_month, datum.data_lezione_year));
    casper.waitUntilVisible('input[value="Salva"]', () => {
        warn("Form appeared, filling up data")
    });
    datum = sanitizeData(datum)

    casper.then(function() {
        this.fill("form", datum ,false)
        info("- Filled all fields")
    })
    casper.wait(2000, function() {
        this.fillSelectors("form", {
            'select[name="c_aula"]': datum.c_aula
        }, false)
        info("- Filled c_aula")
    })
    let name = `row${datum.data_lezione_year}${datum.data_lezione_month}${datum.data_lezione_day}-frame.png`
    casper.then(captureFrame(name))
    casper.then(function() {
        this.click('input[type="SUBMIT"]')
        warn("- Clicked submit")
    })
}

function fillData(casper, data) {
    let {
        registro
    } = casper.cli.options;
    _.forEach(data, function(d) {
        info('adding '+JSON.stringify(d));
        fillForm(casper, registro, d)
    })
}

function openReport(casper) {
}

function openRegistro(casper) {
    let {
        registro
    } = casper.cli.options;

    casper.waitForText("Registro: ")
    casper.then(function() { this.clickLabel('Registro: compilazione online') })
    let label = "INFORMATICA B"
    casper.waitForText(label, () => {
        warn("Registro INFORMATICA B appeared!")
    })
    casper.thenOpen(url_report(registro))
    casper.then(captureFrame("status.png"))
}

var fs = require('fs');

function readData(casper) {
    let {
        datafile
    } = casper.cli.options;
    return JSON.parse(fs.read(datafile));
}

module.exports = {
    openRegistro, readData, fillData
}
