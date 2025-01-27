const startButton = document.getElementById("btn-start");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const playScore = document.getElementById("score");
const playTimer = document.getElementById("timer");
const endMessage = document.getElementById("end-message");
const balloons = ["red", "green", "blue", "purple", "black"];
const balloonLives = {red:5, green:10, blue:15, purple:20, black:25};
let score = 0;
let timeLeft = 60;
let timerInterval;



function startGame() {
    startButton.addEventListener("click",()=> {
        startScreen.style.display = "none";
        gameScreen.style.display = "block";
        score = 0
        timeLeft = 60
        updateScore()
        updateTimer()
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft <= 0) {
                endGame(false);
            }
        }, 1000);
        spawnBalloons();
        

    
    });
}
startGame();
function spawnBalloons() {
    for (let i = 0; i < balloons.length; i++) {
        createBalloons();
        
    }
}

function createBalloons() {
    const balloon = document.createElement("div");
    const color = balloons[Math.floor(Math.random() * balloons.length)];
    balloon.className = "balloon";
    balloon.style.backgroundColor = color;
    balloon.style.top = `${Math.random() * 80}vh`;
    balloon.style.left = `${Math.random() * 80}vw`;
    balloon.dataset.life = balloonLives[color];
    balloon.onclick = () => popBalloon(balloon);
    gameScreen.appendChild(balloon);
}
function popBalloon(balloon) {
    let life = parseInt(balloon.dataset.life)
    if(life > 1){
        life --;
        balloon.dataset.life = life
    }else {
        score++;
        updateScore();
        balloon.remove();
    }
    if(document.querySelectorAll(".balloon").length === 0){
        endGame = true

    }
}
function updateScore(){
    playScore.textContent =`Score: ${score}`
}
function updateTimer(){
    playTimer.textContent = `Timer: ${timeLeft}`
}








