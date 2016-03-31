/* eslint quotes: [0], strict: [0] */
var {
    $d, $o, $fs
    // $r.stdin() -> Promise  ;; to read from stdin
} = require('zaccaria-cli')

var getOptions = doc => {
    "use strict"
    var o = $d(doc)
    var help = $o('-h', '--help', false, o)
    return {
        help
    }
}

var main = () => {
    $fs.readFileAsync(__dirname + '/docs/usage.md', 'utf8').then(it => {
        var {
            help
        } = getOptions(it);
        if (help) {
            console.log(it)
        }
    })
}

main()
