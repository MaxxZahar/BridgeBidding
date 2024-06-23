const newHandButton = document.querySelector('.new-hand-button');
const handC = document.querySelector('.hand');
const biddingBox = document.querySelector('.bidding-box');
const screen = document.querySelector('.screen');
const saveButton = document.querySelector('.save-button');

createBiddingBox();

biddingBox.addEventListener('click', (e) => {
    if (e.target.classList.contains('bid')) {
        screen.textContent = e.target.textContent;
        currentBid = e.target.id;
    }
});

let currentHand;
let currentBid;

newHandButton.addEventListener('click', (e) => {
    e.preventDefault();
    handC.classList.remove('vulnerable');
    console.log('New Hand');
    getHand();
});

saveButton.addEventListener('click', (e) => {
    if (!currentHand || !currentBid || currentBid === "Bid") return;
    e.preventDefault();
    const hand = Array(52).fill(0);
    for (const card of currentHand) {
        hand[card.id] = 1;
    }
    if (handC.classList.contains('vulnerable')) {
        hand.push(1);
    } else {
        hand.push(0);
    }
    hand.push(currentBid);
    const jsonHand = JSON.stringify(hand);
    console.log((jsonHand));
    fetch('sendData', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonHand
    }).then(data => console.log(data)).catch(err => console.log(err));
    currentBid = undefined;
    currentHand = undefined;
    screen.textContent = 'Bid';
});

async function getHand() {
    fetch('openBidLearn/hand.json')
        .then(res => res.json())
        .then(hand => { displayHand(hand); currentHand = hand; })
        .catch(err => console.log(err));
}

function displayHand(hand) {
    createCards();
    const cardsC = handC.querySelectorAll('.card');
    for (let i = 0; i < 13; i++) {
        cardsC[i].textContent = hand[i].value;
        switch (hand[i].suit) {
            case '\u2660':
                cardsC[i].classList.add('spades');
                break;
            case '\u2663':
                cardsC[i].classList.add('clubs');
                break;
            case '\u2665':
                cardsC[i].classList.add('hearts');
                break;
            case '\u2666':
                cardsC[i].classList.add('diamonds');
                break;
            default:
                console.log('Something is wrong with card suits');
        }
    }
    const isVulnerable = Math.random() >= 0.5 ? true : false;
    if (isVulnerable) {
        handC.classList.add('vulnerable');
    }
    handC.dataset.hcp = countPoints(hand);
}

function createCards() {
    const cardsC = handC.querySelectorAll('.card');
    for (const cardC of cardsC) {
        cardC.remove();
    }
    for (let i = 0; i < 13; i++) {
        const cardC = document.createElement('div');
        cardC.classList.add('card');
        handC.appendChild(cardC);
    }
}

function createBiddingBox() {
    for (let i = 0; i < 38; i++) {
        const bidC = document.createElement('div');
        bidC.classList.add('bid');
        biddingBox.appendChild(bidC);
        let bid = Math.floor(i / 5 + 1);
        switch (i % 5) {
            case 0:
                bid += '\u2663';
                break;
            case 1:
                bid += '\u2666';
                break;
            case 2:
                bid += '\u2665';
                break;
            case 3:
                bid += '\u2660';
                break;
            case 4:
                bid += 'NT';
                break;
        }
        if (i === 35) {
            bid = 'PASS';
            bidC.classList.add('pass');
        }
        if (i === 36) {
            bid = 'X';
            bidC.classList.add('double');
        }
        if (i === 37) {
            bid = 'XX';
            bidC.classList.add('redouble');
        }
        bidC.textContent = bid;
        bidC.id = i;
    }
}

function countPoints(hand) {
    let counter = 0;
    for (const card of hand) {
        switch (card.value) {
            case 'J':
                counter += 1;
                break;
            case 'Q':
                counter += 2;
                break;
            case 'K':
                counter += 3;
                break;
            case 'A':
                counter += 4;
                break;
        }
    }
    return counter;
}