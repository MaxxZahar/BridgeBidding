const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const Deck = require('./deck');
const utils = require('./utils/countHandParams');
const funcs = require('./utils/funcs');
const PAGE_OPTIONS = require('./options/options');

const server = http.createServer((req, res) => {
    if (req.url === '/openBidLearn' && req.method === 'GET') {
        console.log('GET request');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const rStream = fs.createReadStream('../client/html/openBidLearn.html').pipe(res);
    } else if (req.url === '/sendData') {
        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const data = JSON.parse(Buffer.concat(body).toString()).join(';') + '\r\n';
            console.log(data);
            const wStream = fs.createWriteStream('./data/openingBidData.csv', { flags: 'a' });
            wStream.write(data);
            wStream.end();
            res.writeHead(201);
            res.end();
        });
        console.log('POST request');
    }
    else if (req.url === '/css/openBidLearn.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fs.createReadStream('../client/css/openBidLearn.css').pipe(res);
    } else if (req.url === '/js/openBidLearn.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        fs.createReadStream('../client/js/openBidLearn.js').pipe(res);
    }
    else if (req.url === '/openBidLearn/hand.json') {
        console.log('Generated hand');
        const deck = new Deck();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deck.getSinglePlayerCards()));
    } else if (req.url.includes('/openBidLearn/data/')) {
        console.log('Data requested');
        const parsed = url.parse(req.url);
        const query = querystring.parse(parsed.query);
        const { page } = query;
        const pageNumber = Number(page);
        console.log(pageNumber);
        if (isNaN(pageNumber) || pageNumber < 1) {
            funcs.pageDoesNotExist(res);
            console.log('PAGE DOES NOT EXIST');
        } else {
            fs.readFile('./data/openingBidData.csv', { encoding: 'utf-8' }, function (err, data) {
                if (err) console.log(err.message);
                const deals = data.split('\r\n');
                const totalPages = Math.ceil(deals.length / PAGE_OPTIONS.DEALS_PER_PAGE);
                if (pageNumber > totalPages) {
                    funcs.pageDoesNotExist(res);
                    console.log('PAGE DOES NOT EXIST');
                } else {
                    const startIndex = PAGE_OPTIONS.DEALS_PER_PAGE * (pageNumber - 1);
                    const lastIndex = startIndex + PAGE_OPTIONS.DEALS_PER_PAGE;
                    let cut = deals.slice(startIndex, lastIndex);
                    cut = cut.map(function (deal, i) {
                        deal = deal.split(';');
                        const dealObject = {
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
                }
            });
        }
    } else {
        funcs.pageDoesNotExist(res);
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Server listens on port ${process.env.PORT}`);
});