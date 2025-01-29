const startButton = document.getElementById("btn-start");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const playScore = document.getElementById("score");
const playTimer = document.getElementById("timer");
const endScreen = document.getElementById("end-screen");
const endMessageWon = document.getElementById("end-message-won");
const endMessageWonScore = document.getElementById("end-message-won-score");
const endMessageLose = document.getElementById("end-message-lose");
const endMessageLoseScore = document.getElementById("end-message-lose-score");
const restartButton = document.getElementById("btn-playAgain");
const balloons = ["red", "green", "blue", "purple", "black"];
const balloonLives = {red:5, green:10, blue:15, purple:20, black:25};
let score = 0;
let timeLeft = 60;
let timerInterval;
let spawnInterval;
let extraBalloons;
let duck;
const pop = new Audio("styles/sounds/pop.mp3")
const startSound = new Audio ("styles/sounds/startSound.mp3")
const duckSound = new Audio ("styles/sounds/duck.mp3")
const winSound = new Audio ("styles/sounds/claps.mp3")
const loseSound = new Audio ("styles/sounds/lose.mp3")

function startGame() {
    startButton.addEventListener("click",()=> {
        startScreen.style.display = "none";
        gameScreen.style.display = "flex";
        
        startSound.loop = true
        startSound.play()
        updateScore()
        updateTimer()
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 30 && !extraBalloons) {
                extraBalloons = true;
                spawnInterval = setInterval(() => {
                    spawnBalloons(5);
                }, 10000);
            }
            if (timeLeft <= 0) {
                endGame(false);
            }
            if(timeLeft === 58){
                createDuck()
            }
        }, 1000);
        spawnBalloons();
        
    });
}
startGame();
function spawnBalloons() {
    for (let i = 0; i < 10; i++) {
        createBalloons();
    }
}
function createDuck() {
    duck = document.createElement("div");
    duck.className = "duck"
    duck.style.backgroundImage = "url('styles/images/duck.png"
    duck.style.backgroundSize = "contain";
    duck.style.backgroundRepeat = "no-repeat";
    duck.style.backgroundPosition = "center";
    duck.style.width = "100px";
    duck.style.height = "120px";
    duck.style.position = "absolute";
    duck.style.top = `${Math.random() * 80}vh`;
    duck.style.right = "0";
    gameScreen.appendChild(duck)
    duck.addEventListener("click",function () {
        duckSound.play();
        score --;
        updateScore()
    })
    moveDuck()
}
let duckPosition = window.innerWidth;
const duckSpeed = 2;
function moveDuck() {
    const moveInterval = setInterval(() => {
        if (duck) {
            duckPosition -= duckSpeed;
            duck.style.left = `${duckPosition}px`;
            if (duckPosition < -100) {
                duckPosition = window.innerWidth;
                duck.style.top = `${Math.random() * 80}vh`;
            }
        }
    }, 16);
}
function createBalloons() {
    const balloon = document.createElement("div");
    const color = balloons[Math.floor(Math.random() * balloons.length)];
    balloon.className = "balloon";
    balloon.style.backgroundImage = `url('styles/images/${color}-balloon.png')`;
    balloon.style.backgroundSize = "contain";
    balloon.style.backgroundRepeat = "no-repeat";
    balloon.style.backgroundPosition = "center";
    balloon.style.width = "100px";
    balloon.style.height = "120px";
    balloon.style.position = "absolute";
    balloon.style.top = `${Math.random() * 80}vh`;
    balloon.style.left = `${Math.random() * 80}vw`;
    balloon.dataset.life = balloonLives[color];
    balloon.onclick = () => popBalloon(balloon);
    gameScreen.appendChild(balloon);
}
function popBalloon(balloon) {
    const popSound = new Audio("styles/sounds/dardo.mp4");
    popSound.play();
    let life = parseInt(balloon.dataset.life)
    if(life > 1){
        life --;
        balloon.dataset.life = life
    }else {
        balloon.remove();
       pop.play()
    }
    score++;
        updateScore();
    if(document.querySelectorAll(".balloon").length === 0){
        endGame(true)
        
    }
}
function updateScore(){
    playScore.textContent =`Score: ${score}`
}
function updateTimer(){
    playTimer.textContent = `Timer: ${timeLeft}`
}
function endGame() {
    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    gameScreen.style.display = "none";
    endScreen.style.display = "flex";
    if(document.querySelectorAll(".balloon").length === 0){
        endMessageWon.style.display = "flex";
        endMessageWon.textContent = `You Win! 🎉`;
        endMessageWonScore.textContent = ` Score: ${score}`
        winSound.play()       
    }else{
        endMessageLose.style.display = "flex";
        endMessageLose.textContent = `Game Over! 😢`;
        endMessageLoseScore.textContent = ` Score: ${score}`
        loseSound.play()
        
    }
    
    startSound.loop = false
    startSound.pause()
}
function restartGame() {
    endScreen.style.display = "none";
    startScreen.style.display = "flex";
    score = 0;
    timeLeft = 60;
    extraBalloons= false;
    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    const balloons = document.querySelectorAll(".balloon");
    balloons.forEach(balloon => balloon.remove());
    playScore.textContent = "Score: 0";
    playTimer.textContent = "Timer: 60";
}
restartButton.addEventListener("click",restartGame)








