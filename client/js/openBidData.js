const table = document.querySelector('.openbid_table');
const body = table.querySelector('tbody');
const caption = table.querySelector('caption');
const previousLink = document.querySelector('.previous');
const nextLink = document.querySelector('.next');

let pageNumber = table.dataset.pagenumber || 1;

function fillCaption(pageNumber) {
    caption.textContent = `Page ${pageNumber}`;
}

function createDealRecord(deal) {
    const row = document.createElement('tr');
    body.appendChild(row);
    delete deal.page;
    for (const key of Object.keys(deal)) {
        const cell = document.createElement('td');
        cell.classList.add(key);
        cell.textContent = deal[key];
        row.appendChild(cell);
    }
}

function createDealPage(deals) {
    pageNumber = deals[0].page || 1;
    fillCaption(pageNumber);
    for (const deal of deals) {
        createDealRecord(deal);
    }
    previousLink.setAttribute('href', `/openBidLearn/data/?page=${pageNumber - 1}`);
    nextLink.setAttribute('href', `/openBidLearn/data/?page=${pageNumber + 1}`);
}

fetch(`/openBidLearn/data/deals.json/?page=${pageNumber}`)
    .then(res => res.json())
    .then(deals => createDealPage(deals))
    .catch(err => console.log(err));

