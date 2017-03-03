const isUndefined = require("lodash.isundefined");

let g = require("./_messages");
let { info, error } = g("Login");

let url_login = "http://www.polimi.it/intranet/";
let url_logout = "https://www.intranet.polimi.it/it/c/portal/logout";
let url_servizi = "http://www.polimi.it/servizionline";

let viewport = {
  top: 0,
  left: 0,
  width: 1280,
  height: 1024
};

function captureFrame(name) {
  return function() {
    this.capture(name, viewport);
    info("Saving " + name);
  };
}

let _l_login = g(url_login).info;
let _l_ser = g(url_servizi).info;
let _l_exit = g(url_logout).info;

function login(casper) {
  info("Scheduling login");
  let username, password, personNumber;
  username = casper.cli.options.username;
  password = casper.cli.options.password;
  personNumber = "0" + casper.cli.options.personnumber;

  if (isUndefined(username) || isUndefined(password)) {
    error("Please insert username and password and number of registro");
    casper.exit();
  }
  casper.start(url_login, function() {
    _l_login("logged in");
  });
  casper.then(function() {
    this.viewport(viewport.width, viewport.height);
  });
  casper.then(function() {
    _l_login("waiting for complete page to load");
    this.waitForSelector(".polifooter", function() {
      _l_login("complete page loaded");
    });
  });

  casper.then(function() {
    _l_login("filling up username and password");

    this.fill(
      "form",
      {
        login: username,
        password: password
      },
      false
    );
  });

  casper.then(function() {
    _l_login("click button 'Accedi'");
    this.clickLabel("Accedi", "button");
    _l_login("waiting for 'Servizi on line'");
  });

  casper.waitForText("Servizi online");
  casper.thenOpen(url_servizi);
  casper.then(function() {
    _l_ser(`Waiting for ${personNumber}`);
  });
  casper.waitForText(personNumber);
  casper.then(function() {
    _l_ser(`appeared, clicking on ${personNumber}`);
    casper.then(captureFrame("login.beforeclick.png"));
    this.clickLabel(personNumber);
    _l_ser("clicked on current person number");
  });
}

function logout(casper) {
  casper.then(function() {
    _l_exit("requesting exit");
  });
  casper.thenOpen(url_logout);
  casper.run(function() {
    _l_exit("done.");
    casper.exit(0);
  });
}

module.exports = { login, logout, captureFrame };
