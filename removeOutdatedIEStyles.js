const removeStyles = function(file) {
    const postcss = require('postcss');
    const syntax = require('postcss-less');
    const stringify = require('postcss-less/dist/less-stringify');
    const fs = require("fs");
    const discard = require('postcss-discard');
    const unprefix = require("postcss-unprefix");
    const autoprefixer = require("autoprefixer");

    const plugins = [discard({
        rule: [/^\s*\* ?html/,
            /\.ie-(?!(11|any))/,
            /\.ie[89]/,
            /\..+-ie(?!-any)(?=,|\b|{)/,
            /::-ms-clear/,
            /::-ms-reveal/
        ],
        decl: [/^\s*zoom:/,
            /.*\\9$/,
            /.?.*\/\*\\\*\*\/ *{/,
            /.+:.+\\0\//,
            /\u002A/,
            /filter/
        ]
    }), unprefix, autoprefixer];

    if ((/\.css$/i).test(file)) {
        postcss(plugins)
            .process(fs.readFileSync(file).toString())
            .then(function (result) {
                fs.writeFileSync(file, result.content, 'utf8')
            });
    }
    else if ((/\.less$/i).test(file)) {
        postcss(plugins)
            .process(fs.readFileSync(file).toString(), {
                syntax: syntax,
                stringifier: stringify
            })
            .then(function (result) {
                fs.writeFileSync(file, result.content, 'utf8')
            });
    }
};

module.exports.removeStyles = removeStyles;