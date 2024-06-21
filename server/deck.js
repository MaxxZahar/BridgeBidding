class Deck {
    constructor() {
        this.deck = [];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
        const suits = ['\u2663', '\u2666', '\u2665', '\u2660'];
        let id = 0;
        for (const suit of suits) {
            for (const value of values) {
                const card = { value, suit, id }
                this.deck.push(card);
                id++;
            }
        }
    }
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const rI = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[rI]] = [this.deck[rI], this.deck[i]];
        }
    }
    getHand() {
        this.shuffle();
        const hand = {
            'N': this.deck.slice(0, 13),
            'E': this.deck.slice(13, 26),
            'S': this.deck.slice(26, 39),
            'W': this.deck.slice(39, 52)
        }
        return hand;
    }
    getSinglePlayerCards() {
        this.shuffle();
        return this.deck.slice(0, 13).sort((a, b) => a.id - b.id);
    }
}

module.exports = Deck;