const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const Deck = require('./deck');
const funcs = require('./utils/funcs');

const server = http.createServer((req, res) => {
    if (req.url === '/openBidLearn' && req.method === 'GET') {
        console.log('GET request');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream('../client/html/openBidLearn.html').pipe(res);
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
        let pageNumber = Number(page);
        console.log(pageNumber);
        if (isNaN(pageNumber) || pageNumber < 1) {
            pageNumber = 1;
        }
        funcs.getPageData(pageNumber, res);
    } else {
        funcs.pageDoesNotExist(res);
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Server listens on port ${process.env.PORT}`);
});