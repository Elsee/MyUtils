const removeStyles = function(file) {
    const postcss = require('postcss');
    const syntax = require('postcss-less');
    const stringify = require('postcss-less/dist/less-stringify');
    const fs = require("fs");
    const discard = require('postcss-discard');
    const unprefix = require("postcss-unprefix");
    const autoprefixer = require("autoprefixer");
    const stylelint = require("stylelint");
    const stylefmt = require("stylefmt");
    const prettify = require("postcss-prettify");
    const stylehacks = require("stylehacks");
    const border = require('postcss-border');
    const merge = require('postcss-merge-longhand');

    const plugins = [
        stylehacks,
        prettify({
            syntax: "less"
        }),
        merge,
        discard({
            rule: [/^\s*\* ?html/,
                /\.ie-(?!(11|any))/,
                /\.ie[89]/,
                /\..+-ie(?!-any)(?=,|\b|{)/,
                /\.body__1/,
                /::-ms-clear/,
                /::-ms-reveal/
            ],
            decl: [/^\s*zoom:/,
                /.*\\9$/,
                /.?.*\/\*\\\*\*\/ *{/,
                /.+:.+\\0\//,
                /filter/
            ]
        }),
        unprefix,
        autoprefixer,
        stylefmt({
            configFile: "../../diadoc/_Src/Hosting/web-app/.stylelintrc"
        }),
        stylelint({
            configFile: "../../diadoc/_Src/Hosting/web-app/.stylelintrc",
            fix: true
        }),
        border
    ];

    if ((/\.css$/i).test(file) && !(/\.min.css$/i).test(file)) {
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