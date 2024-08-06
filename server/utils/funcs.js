const fs = require('fs');
const utils = require('./countHandParams');
const PAGE_OPTIONS = require('../options/options');
const CARDS_DICTIONARY = require('./consts').CARDS_DICTIONARY;

function pageDoesNotExist(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page does not exist');
}

async function getPageData(pageNumber, res) {
    fs.readFile('./data/openingBidData.csv', { encoding: 'utf-8' }, function (err, data) {
        if (err) console.log(err.message);
        let deals = data.split('\r\n');
        deals = deals.slice(0, deals.length - 1);
        const totalPages = Math.ceil(deals.length / PAGE_OPTIONS.DEALS_PER_PAGE);
        if (pageNumber > totalPages) {
            pageNumber = totalPages;
        }
        const startIndex = PAGE_OPTIONS.DEALS_PER_PAGE * (pageNumber - 1);
        const lastIndex = startIndex + PAGE_OPTIONS.DEALS_PER_PAGE;
        let cut = deals.slice(startIndex, lastIndex);
        cut = cut.map(function (deal, i) {
            deal = deal.split(';');
            const dealObject = {
                page: pageNumber,
                id: startIndex + i + 1,
                hcp: utils.countHCP(deal),
                form: utils.countForm(deal),
                vulnerability: utils.getVulnerability(deal),
                bid: utils.getBid(deal),
                cards: displayHand(getCardsArray(deal))
            }
            return dealObject;
        })
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cut));

    });
}

function getCardsArray(deal) {
    const result = []
    for (let i = 0; i < 52; i++) {
        if (deal[i] == 1) {
            result.push(i);
        }
    }
    return result;
}

function displayHand(hand) {
    let str = ''
    let currentSuit;
    for (const card of hand) {
        if (CARDS_DICTIONARY[card].suit !== currentSuit) {
            str += ' ' + CARDS_DICTIONARY[card].suit + CARDS_DICTIONARY[card].value;
            currentSuit = CARDS_DICTIONARY[card].suit;
        } else {
            str += CARDS_DICTIONARY[card].value;
        }
    }
    return str;
}

module.exports = { pageDoesNotExist, getPageData };