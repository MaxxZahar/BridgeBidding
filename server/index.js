const http = require('http');
const Deck = require('./deck');


const server = http.createServer((req, res) => {

});

server.listen(process.env.PORT, () => {
    console.log(`Server listens on port ${process.env.PORT}`);
});