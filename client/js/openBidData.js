const table = document.querySelector('.openbid_table');
const body = table.querySelector('tbody');
const caption = table.querySelector('caption');
const previousLink = document.querySelector('.previous');
const nextLink = document.querySelector('.next');
const lastLink = document.querySelector('.last');

let pageNumber = table.dataset.pagenumber || 1;
let totalPages;

function fillCaption(pageNumber) {
    caption.textContent = `Page ${pageNumber}`;
}

function createDealRecord(deal) {
    const row = document.createElement('tr');
    body.appendChild(row);
    delete deal.page;
    delete deal.totalPages;
    for (const key of Object.keys(deal)) {
        const cell = document.createElement('td');
        cell.classList.add(key);
        cell.textContent = deal[key];
        row.appendChild(cell);
    }
}

function createDealPage(deals) {
    pageNumber = deals[0].page || 1;
    totalPages = deals[0].totalPages;
    fillCaption(pageNumber);
    for (const deal of deals) {
        createDealRecord(deal);
    }
    previousLink.setAttribute('href', `/openBidLearn/data/?page=${pageNumber - 1}`);
    nextLink.setAttribute('href', `/openBidLearn/data/?page=${pageNumber + 1}`);
    lastLink.setAttribute('href', `/openBidLearn/data/?page=${totalPages}`);
}

fetch(`/openBidLearn/data/deals.json/?page=${pageNumber}`)
    .then(res => res.json())
    .then(deals => createDealPage(deals))
    .catch(err => console.log(err));

