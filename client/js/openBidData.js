const table = document.querySelector('.openbid_table');
const body = table.querySelector('tbody');
const caption = table.querySelector('caption');

const testDeal = {
    page: 1,
    id: 1,
    hcp: 12,
    form: [4, 3, 3, 3],
    vulnerability: 'NOT VULNERABLE',
    bid: '1C'
}

const testDeal2 = {
    page: 1,
    id: 1,
    hcp: 12,
    form: [4, 3, 3, 3],
    vulnerability: 'NOT VULNERABLE',
    bid: '1C'
}

const testDeals = [testDeal, testDeal2];

function fillCaption(deals) {
    caption.textContent = `Page ${deals[0].page}`;
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
    fillCaption(deals);
    for (const deal of deals) {
        createDealRecord(deal);
    }
}

createDealPage(testDeals);