interface Card {
    id: number;
    image: string;
    obverse: boolean; // awers
  }

  interface PickedCard {
    id: number;
    pickedCard: HTMLDivElement;
  }

// na późniejszym etapie spróbuje pobrać zawartość folderu z grafikami AJAXEM
// na razie robimy tak ze losuje z tej tablicy do tablicy pomocniczej potrzebna liczbe zdjec
export class MemoryGame {
    private _cards: Card[];
    private _numberOfColumns: number;
    private _numberOfRows: number;
    private _graphics: string[] = [
        "1.png",
        "2.png",
        "3.png",
        "4.png",
        "5.png",
        "6.png",
        "7.png",
        "8.png"
    ];
    private _numberOfPickedCards: number = 0;
    private _pickedCards: PickedCard[] = [];
    private _attempts: number = -1;

    constructor(numberOfColumns: number, numberOfRows: number){
        this.blockOptionInputs(); // blokujemy możliwość wyboru rozmiaru planszy
        this._numberOfColumns = numberOfColumns;
        this._numberOfRows = numberOfRows;
        // losowanie potrzebnej ilości grafik z folderu
        let tempArray: string[] = [];
        for(let i=0; i<(numberOfColumns*numberOfRows)/2; i++)
        {
            tempArray.push(this._graphics[i]);
        }
        this._graphics = tempArray.concat(tempArray); // dublowanie zawartości tablicy
        this.shuffleArray(); // mieszanie zawartości tablicy
        this._cards = this.createCards();
        this.renderBoard();
    }

    get cards(): Card[] {
        return this._cards;
    }

    renderBoard = () => {

        this.attemptIncrement();

        const board: HTMLDivElement = document.querySelector("#board");
        let rowForCards = document.createElement("div");

        this._cards.forEach(card => {

            const cardElement = document.createElement("div");
            cardElement.id = card.id.toString();
            cardElement.classList.add("reverse", "card", "col-3");
            cardElement.setAttribute("name", card.image);
            cardElement.addEventListener('click', () => { this.pickUpCard(cardElement) });
            rowForCards.classList.add("row", "justify-content-center", "d-flex", "h-25");

            if(this._numberOfColumns == 3){
                rowForCards.appendChild(cardElement);
                if((card.id+1)%3==0){
                    board.appendChild(rowForCards);
                    rowForCards = document.createElement("div");
                }
            }else if(this._numberOfColumns == 4){
                rowForCards.appendChild(cardElement);
                if((card.id+1)%4==0){
                    board.appendChild(rowForCards);
                    rowForCards = document.createElement("div");
                }
            }

        })
    }

    private pickUpCard = (cardElement: HTMLDivElement) => {
        // console.log(`id: ${cardElement.id}`);
        this._numberOfPickedCards++;
        this._pickedCards.push({id: Number(cardElement.id), pickedCard: cardElement});
        cardElement.classList.add("averse");
        cardElement.classList.remove("reverse");
        cardElement.style.backgroundImage = `url(./img/pepsi/${cardElement.getAttribute("name")})`;
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

    private checkPair = () => {
        const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll(".card");

        if(this._pickedCards[0].pickedCard.style.backgroundImage == this._pickedCards[1].pickedCard.style.backgroundImage)
        {
            // console.log('takie same');
                setTimeout(() => {
                    cards[this._pickedCards[0].id].style.backgroundImage = "none"; // usuwamy tło
                    cards[this._pickedCards[0].id].classList.add("guessed");
                    cards[this._pickedCards[0].id].classList.remove("reverse"); 

                    cards[this._pickedCards[1].id].style.backgroundImage = "none"; // usuwamy tło
                    cards[this._pickedCards[1].id].classList.add("guessed");
                    cards[this._pickedCards[1].id].classList.remove("reverse");
                }, 500)
        }

        this.attemptIncrement();
    
        setTimeout(() => 
        {
            // sprawdzenie czy koniec gry - wszystkie pary odgadnięte
            if(this.endGame()){ alert(`koniec gry, liczba prób: ${this._attempts}`); }
            else{
                // odblokowanie możliwości klikania po 1 sek
                    cards.forEach(card => {
                        card.classList.remove('disabled');
                        card.classList.remove('averse');
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
                id: i,
                image: this._graphics[i],
                obverse: false
            };
            cards.push(card);
        }
        return cards;
    }

    private attemptIncrement(){
        this._attempts++;
        const scoreDiv: HTMLDivElement = document.querySelector("#score");
        scoreDiv.innerHTML = `Attempts: ${this._attempts}`;
    }

    private blockOptionInputs(){
        const optionInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        optionInputs.forEach(input => {
            input.disabled = !input.disabled;
        });
    }

    private shuffleArray(){
        this._graphics.sort(() => Math.random() - 0.5);
    }
}

  