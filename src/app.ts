import { MemoryGame } from "./classes/MemoryGame.js";

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("3x4").addEventListener("click", () => { new MemoryGame(3,4) });
    document.getElementById("4x4").addEventListener("click", () => { new MemoryGame(4,4) });

});
