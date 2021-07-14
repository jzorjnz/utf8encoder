// var parseDBF = require('parsedbf');
// var dbfParser = require('dbf-parser');
// var dbfReader = require('dbf-reader');
// var DBFFile = require('dbffile');

const fs = require('fs')

const separator_in = ';';
const separator_out = ',';
const test_input = './your csv file.csv';
const test_output = './your csv file output.csv';

// Read file
function readCSVFile(file) {
    var csvFile = fs.readFileSync(file);
    if (csvFile && csvFile.length) {
        return csvFile;
    }
    return null;
}

// Process CSV buffer
function processCSV(csvData) {
    // Define regex for separator change
    var find = separator_in;
    var re = new RegExp(find, 'g');

    // Using Buffer to UTF-8 string function
    // let utf8String = csvData.toString('utf-8');

    // Another technique
    let utf8String = unescape(encodeURIComponent(csvData.toString()));

    // Replace separator
    return utf8String.replace(re, separator_out);
}

// Write to file
function writeCSV(csvFile, csvData) {
    fs.writeFile(csvFile, csvData, function (err) {
        if (err) throw err;
        else console.log('Done!');
    });
}

// Start
function start() {
    let csvData = readCSVFile(test_input);
    if (csvData) {
        let csvDataProcessed = processCSV(csvData);
        if (csvDataProcessed) {
            writeCSV(test_output, csvDataProcessed);
        }
    }
}

start();
