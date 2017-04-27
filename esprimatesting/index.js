var esprima = require('esprima');

console.log('esprima version = ', esprima.version);

var code = 'k=1';

// valid token types are Identifier, String, Puctuator, Boolean, EOF,
// Keyword, Null, Numeric, RegularExpression and Template
var tokens = esprima.tokenize(code);
console.log('tokens = ', tokens);


// parse(input, config, cb) // config is optional, cb(on each node) is optional
var parseTree = esprima.parse(code);
console.log('parse tree = ', parseTree);


const readline = require('readline');


// Below code highlights a specific token given by x.type
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
let source = '';

readline.createInterface({ input: process.stdin, terminal: false })
.on('line', line => { source += line + '\n' })
.on('close', () => {
    const tokens = esprima.tokenize(source, { range: true });
    const ids = tokens.filter(x => x.type === 'Punctuator');
    const markers = ids.sort((a, b) => { return b.range[0] - a.range[0] });
    markers.forEach(t => {
        const id = CYAN + t.value + RESET;
        const start = t.range[0];
        const end = t.range[1];
        source = source.slice(0, start) + id + source.slice(end);
    });
    console.log(source);
});

// end