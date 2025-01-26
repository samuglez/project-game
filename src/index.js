const startButton = document.getElementById("btn-start");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const balloons = ["red", "green", "blue", "purple", "black"];
const balloonLives = {red:5, green:10, blue:15, purple:20, black:25};



function startGame() {
    startButton.addEventListener("click",()=> {
        startScreen.style.display = "none";
        gameScreen.style.display = "block";
    
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
    
}







