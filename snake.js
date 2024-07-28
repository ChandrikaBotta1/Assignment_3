var blocksize = 25;
var rows = 20;
var cols = 20;
var board;   //variable to get the html element
var context;  

var snakeX;  //snake head
var snakeY;
var velocityX;  //speed of the snake
var velocityY; 
var snakeBody;

var foodX;  //snake food
var foodY;

var gameOver;  //gameover variable
var snakeLength;
var level;
var defaultSpeed = 5;  // initial speed of the snake
var speedMultiplier;
var score;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blocksize;  //set the board height to no.rows * tilesize
    board.width = cols * blocksize;  
    context = board.getContext('2d');

    document.addEventListener("keyup", changeDirection);
    initializeGame();   //function to start the game
    requestAnimationFrame(update);
};

function initializeGame() 
{
    snakeX = blocksize * 5;
    snakeY = blocksize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    snakeLength = 1;
    level = 1;
    speedMultiplier = 1;
    score = 0;
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("level").innerText = "Level: " + level;
    document.getElementById("game-over").style.display = "none";
    placeFood();
}

function update() {
    if (gameOver) return;

    context.fillStyle = "black";   ////fills the board with black color
    context.fillRect(0, 0, board.width, board.height);  //from (0,0) to (board.height,board.width)

    context.fillStyle = "red"; 
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if (snakeX == foodX && snakeY == foodY) {  // //when snake meets the food
        snakeBody.push([foodX, foodY]);  //pushing the segment into array
        placeFood();
        snakeLength++;
        score++;
        document.getElementById("score").innerText = "Score: " + score;
        if (snakeLength % 30 == 0)   //when snake length reached to 30
        {
            level++;  //level will be increased
            speedMultiplier *= 1.05;  //speed will be increased
            document.getElementById("level").innerText = "Level: " + level;
        }
    }

    for (let i = snakeBody.length - 1; i > 0; i--) 
    {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) 
    {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += velocityX * blocksize;  //speed of the snake
    snakeY += velocityY * blocksize;
    context.fillStyle = "lime";  //snake color
    context.fillRect(snakeX, snakeY, blocksize, blocksize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    if (snakeX < 0 || snakeX >= cols * blocksize || snakeY < 0 || snakeY >= rows * blocksize) {
        endGame();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            endGame();
        }
    }

    setTimeout(function() {
        requestAnimationFrame(update);
    }, 1000 / (defaultSpeed * speedMultiplier));
}

function changeDirection(e) 
{
    if (e.code == "ArrowUp" && velocityY != 1) 
    {
        velocityX = 0;
        velocityY = -1;
    } 
    else if (e.code == "ArrowDown" && velocityY != -1) 
    {
        velocityX = 0;
        velocityY = 1;
    } 
    else if (e.code == "ArrowLeft" && velocityX != 1) 
    {
        velocityX = -1;
        velocityY = 0;
    } 
    else if (e.code == "ArrowRight" && velocityX != -1) 
    {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() 
{
    let validPosition = false;
    while (!validPosition) 
    {
        foodX = Math.floor(Math.random() * cols) * blocksize;
        foodY = Math.floor(Math.random() * rows) * blocksize;
        validPosition = !snakeBody.some(segment => segment[0] == foodX && segment[1] == foodY);
    }
}

function endGame() 
{
    gameOver = true;
    document.getElementById("game-over").style.display = "block";
}

function restartGame() 
{
    initializeGame();
    requestAnimationFrame(update);
}