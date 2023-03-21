interface Card {
    id: number;
    color: string;
    flipped: boolean;
  }

export class MemoryGame {
    private _cards: Card[];
    private _boardSize: number;
    private _colors: string[];
    constructor(boardSize: number){
        this._boardSize = boardSize;
        this._colors = this.drawColors(Math.pow(boardSize,2)/2);
        this._colors = this._colors.concat(this._colors); // dublowanie zawartości tablicy
        this.shuffleArray(); // mieszanie zawartości tablicy z kolorami
        this._cards = this.createCards();
    }

    get cards(): Card[] {
        return this._cards;
    }

    private createCards(): Card[]{
        const cards: Card[] = [];
        for(let i=0; i<Math.pow(this._boardSize,2); i++)
        {
            const card: Card = {
                id: i,
                color: this._colors[i],
                flipped: false
            };
            cards.push(card);
        }
        return cards;
    }

    private drawColors(colorsAmount: number): string[]{
        const colors: string[] = [];

        for(let i=0;i<colorsAmount;i++){
            const colorHex = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            colors.push(colorHex);
        }

        return colors;
    }

    private shuffleArray(){
        this._colors.sort(() => Math.random() - 0.5);
    }
}

  