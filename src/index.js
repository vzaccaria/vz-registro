/* eslint quotes: [0], strict: [0] */
let {
    $d, $o, $fs, $s
    // $r.stdin() -> Promise  ;; to read from stdin
} = require('zaccaria-cli')

let { warn, info, error  } = require('./lib/_messages')

let getOptions = doc => {
    "use strict"
    let o = $d(doc)
    let help = $o('-h', '--help', false, o)
    let user = $o('-u', '--user', undefined, o)
    let password = $o('-p', '--password', undefined, o);
    let registro = $o('-r', '--registro', undefined, o);
    let file = $o('-f', '--file', undefined, o);
    let status = o.status
    let upload = o.upload
    return {
        help, user, password, registro, file, status, upload
    }
}

let main = () => {
    $fs.readFileAsync(__dirname + '/docs/usage.md', 'utf8').then(it => {
        let {
            help, user, password, registro, file, status, upload
        } = getOptions(it);
        if (help) {
            console.log(it)
        } else if (status) {
            let cmd = `casperjs ${__dirname}/lib/_status.js --username=${user} --password=${password} --registro=${registro}`
            warn(cmd);
            $s.execAsync(cmd).then(() => {
                info("file saved in status.png");
            })
        } else if(upload) {
            let cmd = `casperjs ${__dirname}/lib/_upload.js --username=${user} --password=${password} --registro=${registro} --datafile=${file}`
            warn(cmd);
            $s.execAsync(cmd).then(() => {
                info("finished uploading")
            })
        }
    })
}

main()
