interface Card {
    id: number;
    color: string;
    flipped: boolean;
  }

  interface PickedCard {
    id: number;
    pickedCard: HTMLDivElement;
  }

export class MemoryGame {
    private _cards: Card[];
    private _numberOfColumns: number;
    private _numberOfRows: number;
    private _colors: string[];
    private _numberOfPickedCards: number = 0;
    private _pickedCards: PickedCard[] = [];
    private _canPicking: boolean = true;

    constructor(numberOfColumns: number, numberOfRows: number){
        this._numberOfColumns = numberOfColumns;
        this._numberOfRows = numberOfRows;
        this._colors = this.drawColors((numberOfColumns*numberOfRows)/2);
        this._colors = this._colors.concat(this._colors); // dublowanie zawartości tablicy
        this.shuffleArray(); // mieszanie zawartości tablicy z kolorami
        this._cards = this.createCards();
        this.renderBoard();
    }

    get cards(): Card[] {
        return this._cards;
    }

    renderBoard = () => {

        const board: HTMLDivElement = document.querySelector("#board");
        board.innerHTML = '';

        this._cards.forEach(card => {
    
            let cardElement = document.createElement("div");
            cardElement.id = card.id.toString();
            
            cardElement.setAttribute("name", card.color);
            // console.log(`kolor: ${card.color}`);
            cardElement.classList.add("reverse");
            cardElement.classList.add('card');
            cardElement.addEventListener('click', () => { this.pickUpCard(cardElement) });
            if(this._numberOfColumns == 3) cardElement.classList.add('threeXfour');
            else if(this._numberOfColumns == 4) cardElement.classList.add('fourXfour')
    
            board.appendChild(cardElement);

        })
    }

    private pickUpCard = (cardElement: HTMLDivElement) => {
        // console.log(`id: ${cardElement.id}`);
        this._numberOfPickedCards++;
        this._pickedCards.push({id: Number(cardElement.id)-1, pickedCard: cardElement});
        cardElement.classList.add("picked");
        cardElement.classList.remove("reverse");
        cardElement.style.backgroundColor = cardElement.getAttribute("name");
        if(this._numberOfPickedCards >= 2) this.lockPicking();

    }

    private lockPicking = () => {
        const cards = document.querySelectorAll(".card");

        // zablokowanie możliwości podnoszenia
        cards.forEach(card => {
            card.classList.add('disabled');
        });

        this.checkPair();
    }
// tutaj mamy problem
    private checkPair = () => {
        const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll(".card");

        if(this._pickedCards[0].pickedCard.style.backgroundColor == this._pickedCards[1].pickedCard.style.backgroundColor)
        {
            // console.log('takie same');
                setTimeout(() => {
                    cards[this._pickedCards[0].id].classList.add("guessed");
                    cards[this._pickedCards[0].id].classList.remove("reverse"); 

                    cards[this._pickedCards[1].id].classList.add("guessed");
                    cards[this._pickedCards[1].id].classList.remove("reverse");
                }, 500)
        }


    
        setTimeout(() => {
            // sprawdzenie czy koniec gry - wszystkie pary odgadnięte
            if(this.endGame()){ alert("koniec gry"); }
            else{
                // odblokowanie możliwości klikania po 1 sek
                    cards.forEach(card => {
                        card.classList.remove('disabled');
                        card.classList.remove("picked");
                        if(!card.classList.contains("guessed")){
                            card.style.backgroundColor = 'rgb(206, 250, 241)';
                            card.classList.add("reverse");
                        }
                    });
            }

            this._pickedCards = []; // czyścimy tablice wybranych kart po porównaniu ich
            this._numberOfPickedCards = 0; // zerujemy również liczbe wybranych kart
            // console.log(this._pickedCards);
        }, 1000)

    }


    private endGame = (): boolean => {
        const cards = document.querySelectorAll(".card");
        const amountOfCards = cards.length;
        let amountOfGuessedCards = 0;
        cards.forEach(card => {
            if(card.classList.contains("guessed")) amountOfGuessedCards++;
        });
    
        if(amountOfGuessedCards == amountOfCards)
        {
            console.log('finish');
            return true;
        }
        else return false;  
    }

    private createCards(): Card[]{
        const cards: Card[] = [];
        for(let i=0; i<this._numberOfColumns*this._numberOfRows; i++)
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

  