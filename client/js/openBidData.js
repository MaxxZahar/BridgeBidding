const table = document.querySelector('.openbid_table');
const body = table.querySelector('tbody');
const caption = table.querySelector('caption');

let pageNumber = table.dataset.pagenumber || 1;
// const testDeal = {
//     page: 1,
//     id: 1,
//     hcp: 12,
//     form: [4, 3, 3, 3],
//     vulnerability: 'NOT VULNERABLE',
//     bid: '1C'
// }

// const testDeal2 = {
//     page: 1,
//     id: 1,
//     hcp: 12,
//     form: [4, 3, 3, 3],
//     vulnerability: 'NOT VULNERABLE',
//     bid: '1C'
// }

// const testDeals = [testDeal, testDeal2];

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
}

fetch(`/openBidLearn/data/deals.json/?page=${pageNumber}`)
    .then(res => res.json())
    .then(deals => createDealPage(deals))
    .catch(err => console.log(err));

