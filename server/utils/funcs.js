function pageDoesNotExist(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page does not exist');
}

module.exports = { pageDoesNotExist };