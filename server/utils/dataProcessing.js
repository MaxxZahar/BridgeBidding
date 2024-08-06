const fs = require('fs');
const BIDDING_DICTIONARY = require('./consts').BIDDING_DICTIONARY;

function createFrequencyCSV() {
    let data = fs.readFileSync('./data/openingBidData.csv', { encoding: 'utf-8' });
    const frequencies = {};
    data = data.split('\r\n').slice(0, -1).map(record => {
        record = record.split(';');
        record[record.length - 1] = BIDDING_DICTIONARY[record[record.length - 1]];
        return record;
    });
    console.log(data.length);
    for (const record of data) {
        frequencies[record[record.length - 1]] = frequencies[record[record.length - 1]] + 1 || 1;
    }
    let frequencyData = '';
    for (const key of Object.keys(frequencies)) {
        frequencyData += `${key};${frequencies[key]}\r\n`;
    }
    fs.writeFileSync('./data/openBidFrequency.csv', frequencyData);
}

module.exports = { createFrequencyCSV }