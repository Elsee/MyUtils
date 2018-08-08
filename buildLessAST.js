const fs = require('fs');
const path = require('path');
const less = require('less');

function lessAST(filename, options = {}) {
    options.filename = path.resolve(filename);
    return new Promise(function (res, rej) {
        less.parse(fs.readFileSync(filename).toString(), options, function (e, tree) {
            if (e) {
                rej(e);
            } else {
                res(tree);
            }
        });
    });
}

const stringify = require('json-stringify-safe');
lessAST('./b-toggle.less').then(tree => fs.writeFileSync('tree-test.json', (stringify(tree, null, 2)), 'utf8'));