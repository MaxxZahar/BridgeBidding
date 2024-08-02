const fs = require('fs');
const utils = require('./countHandParams');
const PAGE_OPTIONS = require('../options/options');

function pageDoesNotExist(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page does not exist');
}

async function getPageData(pageNumber, res) {
    fs.readFile('./data/openingBidData.csv', { encoding: 'utf-8' }, function (err, data) {
        if (err) console.log(err.message);
        const deals = data.split('\r\n');
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
                bid: utils.getBid(deal)
            }
            return dealObject;
        })
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cut));

    });
}

module.exports = { pageDoesNotExist, getPageData };