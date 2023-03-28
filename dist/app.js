import { MemoryGame } from "./classes/MemoryGame.js";
const endGame = () => {
    const cards = document.querySelectorAll(".card");
    const amountOfCards = cards.length;
    let amountOfGuessedCards = 0;
    cards.forEach(card => {
        if (card.classList.contains("guessed"))
            amountOfGuessedCards++;
    });
    if (amountOfGuessedCards == amountOfCards) {
        console.log('finish');
        return true;
    }
    else {
        console.clear();
        console.log('siema');
        return false;
    }
};
const checkPair = (cards) => {
    let pairToCheck = [];
    cards.forEach(card => {
        if (card.classList.contains("picked"))
            pairToCheck.push(card);
    });
    if (pairToCheck[0].style.backgroundColor == pairToCheck[1].style.backgroundColor) {
        pairToCheck.forEach(guessedCard => {
            setTimeout(() => {
                guessedCard.classList.add("guessed");
                guessedCard.classList.remove("reverse");
            }, 500);
        });
    }
    setTimeout(() => {
        // sprawdzenie czy koniec gry - wszystkie pary odgadnięte
        if (endGame()) {
            alert("koniec gry");
        }
        else {
            // odblokowanie możliwości klikania po 1 sek
            cards.forEach(card => {
                card.classList.remove('disabled');
                card.classList.remove("picked");
                if (!card.classList.contains("guessed")) {
                    card.style.backgroundColor = 'rgb(206, 250, 241)';
                    card.classList.add("reverse");
                }
            });
        }
    }, 1000);
};
const lockPicking = () => {
    const cards = document.querySelectorAll(".card");
    let picked = 0;
    cards.forEach(card => {
        if (card.classList.contains("picked"))
            picked++;
        if (picked >= 2) {
            // zablokowanie możliwośći podnoszenia
            cards.forEach(card => {
                card.classList.add('disabled');
            });
            // !!!tutaj sprawdzenie czy podniesiono dwie takie same
            checkPair(cards);
            return false;
        }
    });
};
const pickUpCard = (cardElement) => {
    // console.log(`id: ${cardElement.id}`);
    cardElement.classList.add("picked");
    cardElement.classList.remove("reverse");
    cardElement.style.backgroundColor = cardElement.getAttribute("name");
    lockPicking();
};
let renderBoard = (size) => {
    // zrobić wybieranie i tworzenie inteligentne
    let x;
    let y;
    if (size == 3) {
        x = 3;
        y = 4;
    }
    else if (size == 4) {
        x = 4;
        y = 4;
    }
    const game = new MemoryGame(x, y);
    const board = document.querySelector("#board");
    let cardsArray = game.cards;
    board.innerHTML = '';
    cardsArray.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id.toString();
        cardElement.setAttribute("name", card.color);
        // console.log(`kolor: ${card.color}`);
        cardElement.classList.add("reverse");
        cardElement.classList.add('card');
        cardElement.addEventListener('click', () => { pickUpCard(cardElement); });
        if (size == 3)
            cardElement.classList.add('threeXfour');
        else if (size == 4)
            cardElement.classList.add('fourXfour');
        board.appendChild(cardElement);
    });
};
document.getElementById("3x4").addEventListener("click", () => { renderBoard(3); });
document.getElementById("4x4").addEventListener("click", () => { renderBoard(4); });
