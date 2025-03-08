const player = document.getElementById("player");
const gameWindow = document.querySelector(".game-window");

let posX = 10, posY = 10;
const step = 20;

const gameWidth = gameWindow.clientWidth - 20;
const gameHeight = gameWindow.clientHeight - 20;

function movePlayer(dx, dy) {
    posX = Math.max(0, Math.min(gameWidth, posX + dx));
    posY = Math.max(0, Math.min(gameHeight, posY + dy));
    player.style.left = posX + "px";
    player.style.top = posY + "px";
    checkWin();
}

function checkWin() {
    const goal = document.querySelector(".goal");
    const goalRect = goal.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    if (playerRect.right >= goalRect.left && playerRect.bottom >= goalRect.top) {
        alert("You win!");
        posX = 10;
        posY = 10;
        movePlayer(0, 0);
    }
}

document.querySelector(".up").addEventListener("click", () => movePlayer(0, -step));
document.querySelector(".down").addEventListener("click", () => movePlayer(0, step));
document.querySelector(".left").addEventListener("click", () => movePlayer(-step, 0));
document.querySelector(".right").addEventListener("click", () => movePlayer(step, 0));