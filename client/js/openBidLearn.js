const newHandButton = document.querySelector('.new-hand-button');
const handC = document.querySelector('.hand');
const biddingBox = document.querySelector('.bidding-box');

let currentHand;

newHandButton.addEventListener('click', (e) => {
    e.preventDefault();
    getHand();
});

async function getHand() {
    fetch('openBidLearn/hand.json')
        .then(res => res.json())
        .then(hand => displayHand(hand))
        .then(hand => currentHand = hand)
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