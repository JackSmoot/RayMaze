//TODO
//Obstacles
//Obstacle randomization
//Timer
//Point system (time left/coins)
//Coins
//Color selector


const player = document.getElementById("player");
const gameWindow = document.querySelector(".game-window");
const obstacles = document.querySelectorAll(".obstacle");


let posX = 0, posY = 0;
const step = 20;

const gameWidth = gameWindow.clientWidth - 20;
const gameHeight = gameWindow.clientHeight - 20;

function movePlayer(dx, dy) {
    newX = Math.max(0, Math.min(gameWidth, posX+dx));
    newY = Math.max(0, Math.min(gameHeight, posY+dy));
    if (!isCollidingWithObstacle(newX, newY)) {
        posX = newX;
        posY = newY;
        player.style.left = posX + "px";
        player.style.top = posY + "px";
    }

    checkWin();
}

function checkWin() {
    const goal = document.querySelector(".goal");
    const goalRect = goal.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    const isTouching =
        playerRect.left == goalRect.left &&
        playerRect.right == goalRect.right &&
        playerRect.top == goalRect.top &&
        playerRect.bottom == goalRect.bottom;

    if (isTouching) {
        alert("You win!");
        posX = 0;
        posY = 0;
        movePlayer(0, 0);
    }
}

function isCollidingWithObstacle(newX, newY) {
    const tempPlayer = { left: newX, top: newY, right: newX + 20, bottom: newY + 20 };

    for (const obstacle of obstacles) {
        const obsRect = obstacle.getBoundingClientRect();
        const obs = {
            left: obsRect.left - gameWindow.getBoundingClientRect().left,
            top: obsRect.top - gameWindow.getBoundingClientRect().top,
            right: obsRect.left - gameWindow.getBoundingClientRect().left + 20,
            bottom: obsRect.top - gameWindow.getBoundingClientRect().top + 20,
        };

        if (
            tempPlayer.right > obs.left &&
            tempPlayer.left < obs.right &&
            tempPlayer.bottom > obs.top &&
            tempPlayer.top < obs.bottom
        ) {
            return true;
        }
    }
    return false;
}

document.querySelector(".up").addEventListener("click", () => movePlayer(0, -step));
document.querySelector(".down").addEventListener("click", () => movePlayer(0, step));
document.querySelector(".left").addEventListener("click", () => movePlayer(-step, 0));
document.querySelector(".right").addEventListener("click", () => movePlayer(step, 0));

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
            movePlayer(0, -step);
            break;
        case "ArrowDown":
        case "s":
        case "S":
            movePlayer(0, step);
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            movePlayer(-step, 0);
            break;
        case "ArrowRight":
        case "d":
        case "D":
            movePlayer(step, 0);
            break;
    }
});