import { MemoryGame } from "./classes/Board.js";
const game = new MemoryGame(4);
let cardsArray = game.cards;
cardsArray.forEach(card => {
    const p = document.createElement("p");
    p.innerHTML = `id:${card.id}, <span style="color:${card.color};">color:${card.color}</span>, flipped: ${card.flipped}`;
    document.body.appendChild(p);
});
console.log(cardsArray);
