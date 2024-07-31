const BIDDING_DICTIONARY = require('./consts').BIDDING_DICTIONARY;

function countForm(deal) {
    const form = [];
    for (let i = 0; i < 4; i++) {
        let counter = 0;
        for (let j = 0; j < 13; j++) {
            if (deal[j + 13 * i] == 1) counter++;
        }
        form.push(counter);
    }
    return form;
}

function countHCP(deal) {
    let counter = 0;
    for (let i = 0; i < 52; i++) {
        switch (i % 13) {
            case 12:
                if (deal[i] == 1) counter += 4;
                break;
            case 11:
                if (deal[i] == 1) counter += 3;
                break;
            case 10:
                if (deal[i] == 1) counter += 2;
                break;
            case 9:
                if (deal[i] == 1) counter += 1;
                break;
        }
    }
    return counter;
}

function getBid(deal) {
    return BIDDING_DICTIONARY[deal.at(-1)];
}

function getVulnerability(deal, mode = 'simple') {
    const vulnerability = deal.at(-2);
    if (mode === 'simple') {
        if (vulnerability == 1) return 'VULNERABLE';
        else return 'NOT VULNERABLE';
    } else if (mode === 'complex') {
        switch (vulnerability) {
            case '0':
                return 'NONE';
            case '1':
                return 'NS';
            case '2':
                return 'EW';
            case '3':
                return 'ALL';
        }
    }
}

module.exports = { countForm, countHCP, getBid, getVulnerability };