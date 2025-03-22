const player = document.getElementById("player");
const gameWindow = document.querySelector(".game-window");
const messageBox = document.getElementById("message-box");
const messageText = document.getElementById("message-text");
const playAgainButton = document.getElementById("play-again");

let posX = 0, posY = 0;
const step = 20;

const gameWidth = gameWindow.clientWidth - 20;
const gameHeight = gameWindow.clientHeight - 20;

let gameOver = false;

let patrolPath = [];
let enemyIndex = 0;
let movingForward = true;

setInterval(checkWin, 65);
setInterval(moveEnemy, 100);
setInterval(checkLose, 65);

function moveEnemy() {
    const enemy = document.querySelector(".enemy"); // Query enemy dynamically
    let target = patrolPath[enemyIndex];

    enemy.style.left = target.x + "px";
    enemy.style.top = target.y + "px";

    // Update enemy index for next movement
    if (movingForward) {
        enemyIndex++;
        if (enemyIndex >= patrolPath.length) {
            movingForward = false;
            enemyIndex -= 2;
        }
    } else {
        enemyIndex--;
        if (enemyIndex < 0) {
            movingForward = true;
            enemyIndex = 1;
        }
    }
}

function movePlayer(dx, dy) {
    const newX = Math.max(0, Math.min(gameWidth, posX + dx));
    const newY = Math.max(0, Math.min(gameHeight, posY + dy));
    if (!isCollidingWithObstacle(newX, newY)) {
        posX = newX;
        posY = newY;
        player.style.left = posX + "px";
        player.style.top = posY + "px";
    }
}

function resetGame() {
    gameOver = false;
    messageBox.style.display = "none";
    posX = 0;
    posY = 0;
    player.style.left = posX + "px";
    player.style.top = posY + "px";

    const randomMap = getRandomMap();
    
    setupMap(randomMap);
}

function checkWin() {
    if (gameOver) return;

    const goal = document.querySelector(".goal");
    const goalRect = goal.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    const isTouching =
        playerRect.left < goalRect.right &&
        playerRect.right > goalRect.left &&
        playerRect.top < goalRect.bottom &&
        playerRect.bottom > goalRect.top;

    if (isTouching) {
        showMessage("🎉 You Win!");
    }
}

function checkLose() {
    if (gameOver) return;

    const enemy = document.querySelector(".enemy"); // Query enemy dynamically
    const enemyRect = enemy.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    const isTouching =
        playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top;

    if (isTouching) {
        showMessage("😢 Game Over! The enemy got you!");
    }
}

function showMessage(text) {
    gameOver = true;
    messageText.textContent = text;
    messageBox.style.display = "block";
}

function isCollidingWithObstacle(newX, newY) {
    const tempPlayer = { left: newX, top: newY, right: newX + 20, bottom: newY + 20 };

    const obstacles = document.querySelectorAll(".obstacle"); // Query obstacles dynamically
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

function getRandomMap() {
    const randomIndex = Math.floor(Math.random() * maps.length);
    return maps[randomIndex];
    //return maps[3];
}

function setupMap(mapData) {
    // Clear existing obstacles and enemies
    document.querySelectorAll(".obstacle").forEach(obs => obs.remove());
    document.querySelectorAll(".enemy").forEach(enemy => enemy.remove());

    // Add obstacles
    mapData.obstacles.forEach(obs => {
        const obstacle = document.createElement("div");
        obstacle.className = "obstacle";
        obstacle.style.left = `${obs.x}px`;
        obstacle.style.top = `${obs.y}px`;
        gameWindow.appendChild(obstacle);
    });

    // Add enemy patrol path
    const enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.style.left = `${mapData.enemyPath[0].x}px`;
    enemy.style.top = `${mapData.enemyPath[0].y}px`;
    gameWindow.appendChild(enemy);

    // Update enemy movement logic
    patrolPath.length = 0; // Clear existing path
    mapData.enemyPath.forEach(point => patrolPath.push(point));
    enemyIndex = 0;
    movingForward = true;
}

// Event listeners for controls
document.querySelector(".up").addEventListener("click", () => {
    if (!gameOver) movePlayer(0, -step);
});
document.querySelector(".down").addEventListener("click", () => {
    if (!gameOver) movePlayer(0, step);
});
document.querySelector(".left").addEventListener("click", () => {
    if (!gameOver) movePlayer(-step, 0);
});
document.querySelector(".right").addEventListener("click", () => {
    if (!gameOver) movePlayer(step, 0);
});

playAgainButton.addEventListener("click", resetGame);

document.addEventListener("keydown", (event) => {
    if (gameOver) return;

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

// Initialize the game
resetGame();