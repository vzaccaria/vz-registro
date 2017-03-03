const foreach = require("lodash.foreach");
const isundefined = require("lodash.isundefined");
const includes = require("lodash.includes");
const range = require("lodash.range");
const clone = require("lodash.clone");
let { captureFrame } = require("./_login");
let url_form = (registro, mese, anno) =>
  `https://www7.ceda.polimi.it/registro_didattica/NuovaRiga.do?evn_=evento&id_registro=${registro}&mese=${mese}/${anno}`;

let url_report = registro =>
  `https://www7.ceda.polimi.it/registro_didattica/ReportConsuntivo.do?evn_=evento&id_registro=${registro}`;

let { warn, info, error } = require("./_messages")("Registro"); 


var acc = function(d) {
  $('select[name="sede"]').val(d.sede);
  $('select[name="c_aula"]').val(d.c_aula);
  $('select[name="data_lezione_day"]').val(d.data_lezione_day);
  $('select[name="inizio_ore"]').val(d.inizio_ore);
  $('select[name="inizio_ore_min"]').val(d.inizio_ore_min);
  $('select[name="termine_ore"]').val(d.termine_ore);
  $('select[name="termine_ore_min"]').val(d.termine_ore_min);
  $('select[name="n_ore_lez"]').val(d.n_ore_lez);
  $('select[name="n_ore_lez_min"]').val(d.n_ore_lez_min);
  $('select[name="c_forma_didattica"]').val(d.c_forma_didattica);
  $('select[name="docente"]').val(d.docente);
  if (d.docente === "S") {
    $('input[name="docente_ospite"]').val(d.docente_ospite);
  } else {
    $('input[name="docente_ospite"]').val("");
  }
  $("#contenuto").text(d.contenuto);
};

function fillForm(casper, registro, datum) {
  casper.thenOpen(
    url_form(registro, datum.data_lezione_month, datum.data_lezione_year)
  );

  casper.waitUntilVisible('input[value="Salva"]', () => {
    warn("Form appeared, choosing sede");
  }); 

  casper.thenEvaluate(
    function(d) {
      // Important, dont move it from here since we should download data about aule
      $('select[name="sede"]').val(d.sede);
    },
    datum
  );

  casper.wait(2000);
  casper.thenEvaluate(acc, datum);
  let name = `row${datum.data_lezione_year}${datum.data_lezione_month}${datum.data_lezione_day}-frame.png`;
  casper.then(captureFrame(name));
  casper.then(function() {
    this.click('input[type="SUBMIT"]');
    warn("- Clicked submit");
  });
}

function fillData(casper, data) {
  let {
    registro,
    start,
    end,
    dryrun
  } = casper.cli.options;
  if (isundefined(start)) {
    start = 0;
  } else {
    start = parseInt(start);
  }
  if (isundefined(end)) {
    end = data.length;
  } else {
    end = parseInt(end);
  }
  dryrun = parseInt(dryrun);
  foreach(data, function(d, i) {
    if (includes(range(start, end + 1), i)) {
      info(`adding entry ${i}`);
      if (dryrun === 0) {
        fillForm(casper, registro, clone(d));
      } else {
        info("Skipping as this is a dryrun");
      }
    } else {
      info(`Skipping entry ${i} - outside range`);
    }
  });
}

function openRegistro(casper) {
  let {
    registro
  } = casper.cli.options;

  casper.waitForText("Registro: ");
  casper.then(function() {
    this.clickLabel("Registro: compilazione online");
  });
  let label = "INFORMATICA B";
  casper.waitForText(label, () => {
    warn("Registro INFORMATICA B appeared!");
  });
  casper.thenOpen(url_report(registro));
  casper.then(captureFrame("status.png"));
}

// Poor man dependency injection
function readData(casper, fs) {
  let {
    datafile
  } = casper.cli.options;
  info(`Reading -> ${datafile}`);
  try {
    let data = fs.read(datafile);
    return JSON.parse(data);
  } catch (e) {
    error(`Error thrown ${e}`);
    casper.exit(0);
  }
}

module.exports = {
  openRegistro,
  readData,
  fillData
};
