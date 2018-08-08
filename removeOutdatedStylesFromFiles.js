
const args = require('minimist')(process.argv.slice(2));
const extractNames = require('./extractFileNames');

const extractedFiles = extractNames.extractFileNames(args.dir, [], ['css', 'less']);

const processFile = require('./removeOutdatedIEStyles');

extractedFiles.forEach(file => {
    processFile.removeStyles(file);
});
