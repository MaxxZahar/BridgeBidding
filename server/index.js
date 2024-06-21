const http = require('http');
const fs = require('fs');
const Deck = require('./deck');

const server = http.createServer((req, res) => {
    if (req.url === '/openBidLearn') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream('../client/html/openBidLearn.html').pipe(res);
    } else if (req.url === '/css/openBidLearn.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fs.createReadStream('../client/css/openBidLearn.css').pipe(res);
    } else if (req.url === '/js/openBidLearn.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        fs.createReadStream('../client/js/openBidLearn.js').pipe(res);
    }
    else if (req.url === '/openBidLearn/hand.json') {
        const deck = new Deck();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deck.getSinglePlayerCards()));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page does not exist');
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Server listens on port ${process.env.PORT}`);
});