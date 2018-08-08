'use strict';

const args = require('minimist')(process.argv.slice(2));

const extractFileNames = function(dir = args.dir, filelist = [], extensions = ['.*']) {

    const fs = require('fs');
    const path = require('path');
    const extensionsToString = extensions.join('|');
    const regexp = new RegExp('\\.('+extensionsToString+')$', 'i');

    fs.readdirSync(dir).forEach(file => {
        filelist = fs.statSync(path.join(dir, file)).isDirectory()
            ? extractFileNames(path.join(dir, file), filelist, extensions)
            : regexp.test(file)
                ? filelist.concat(path.join(dir, file))
                : filelist;
    });

    fs.writeFileSync('./test.txt', filelist, 'utf8');
    return filelist;
};

module.exports.extractFileNames = extractFileNames;