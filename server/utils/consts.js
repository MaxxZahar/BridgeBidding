const BIDDING_DICTIONARY = {
    '0': '1C',
    '1': '1D',
    '2': '1H',
    '3': '1S',
    '4': '1NT',
    '5': '2C',
    '6': '2D',
    '7': '2H',
    '8': '2S',
    '9': '2NT',
    '10': '3C',
    '11': '3D',
    '12': '3H',
    '13': '3S',
    '14': '3NT',
    '15': '4C',
    '16': '4D',
    '17': '4H',
    '18': '4S',
    '19': '4NT',
    '20': '5C',
    '21': '5D',
    '22': '5H',
    '23': '5S',
    '24': '5NT',
    '25': '6C',
    '26': '6D',
    '27': '6H',
    '28': '6S',
    '29': '6NT',
    '30': '7C',
    '31': '7D',
    '32': '7H',
    '33': '7S',
    '34': '7NT',
    '35': 'PASS',
    '36': 'X',
    '37': 'XX',
}

const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const suits = ['\u2663', '\u2666', '\u2665', '\u2660'];

const CARDS_DICTIONARY = {}

for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
        const card = { suit: suits[i], value: values[j] }
        CARDS_DICTIONARY[i * values.length + j] = card;
    }
}

module.exports = { BIDDING_DICTIONARY, CARDS_DICTIONARY };