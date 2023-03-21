export class MemoryGame {
    constructor(boardSize) {
        this._boardSize = boardSize;
        this._colors = this.drawColors(Math.pow(boardSize, 2) / 2);
        this._colors = this._colors.concat(this._colors); // dublowanie zawartości tablicy
        this.shuffleArray(); // mieszanie zawartości tablicy z kolorami
        this._cards = this.createCards();
    }
    get cards() {
        return this._cards;
    }
    createCards() {
        const cards = [];
        for (let i = 0; i < Math.pow(this._boardSize, 2); i++) {
            const card = {
                id: i,
                color: this._colors[i],
                flipped: false
            };
            cards.push(card);
        }
        return cards;
    }
    drawColors(colorsAmount) {
        const colors = [];
        for (let i = 0; i < colorsAmount; i++) {
            const colorHex = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            colors.push(colorHex);
        }
        return colors;
    }
    shuffleArray() {
        this._colors.sort(() => Math.random() - 0.5);
    }
}
