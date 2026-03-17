
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// Game Settings
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let score = 0;
let speed = 7;

// Snake and Food Setup
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;

// Game Loop
function drawGame() {
    updateSnakePosition();
    
    if (isGameOver()) {
        alert("Game Over! Score: " + score);
        resetGame();
        return;
    }

    clearScreen();
    checkFoodCollision();
    drawFood();
    drawSnake();
    
    setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#2ecc71';
    snake.forEach(part => ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2));
}

function drawFood() {
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function updateSnakePosition() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        score++;
        scoreElement.innerText = "Score: " + score;
        snake.push({});
    }
}

function isGameOver() {
    let gameOver = false;

    if (snake[0].x < 0 || snake[0].x === tileCount || snake[0].y < 0 || snake[0].y === tileCount) {
        gameOver = true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver = true;
        }
    }

    return gameOver;
}

function resetGame() {
    score = 0;
    scoreElement.innerText = "Score: " + score;
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    drawGame();
}

// Controls
document.body.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.keyCode === 38 && dy !== 1) { dx = 0; dy = -1; }
    if (event.keyCode === 40 && dy !== -1) { dx = 0; dy = 1; }
    if (event.keyCode === 37 && dx !== 1) { dx = -1; dy = 0; }
    if (event.keyCode === 39 && dx !== -1) { dx = 1; dy = 0; }
}

drawGame();