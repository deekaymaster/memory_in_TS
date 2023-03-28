interface Card {
    id: number;
    color: string;
    flipped: boolean;
  }

export class MemoryGame {
    private _cards: Card[];
    private _boardSizeX: number;
    private _boardSizeY: number;
    private _colors: string[];
    constructor(boardSizeX: number, boardSizeY: number){
        this._boardSizeX = boardSizeX;
        this._boardSizeY = boardSizeY;
        this._colors = this.drawColors((boardSizeX*boardSizeY)/2);
        this._colors = this._colors.concat(this._colors); // dublowanie zawartości tablicy
        this.shuffleArray(); // mieszanie zawartości tablicy z kolorami
        this._cards = this.createCards();
    }

    get cards(): Card[] {
        return this._cards;
    }

    private createCards(): Card[]{
        const cards: Card[] = [];
        for(let i=0; i<this._boardSizeX*this._boardSizeY; i++)
        {
            const card: Card = {
                id: i+1,
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

  