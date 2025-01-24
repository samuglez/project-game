let score = 0
const addScore = document.getElementsByClassName("score")[0]

function updateScore (newScore) {
    score = newScore
    //Cuando player derrote a un enemie debe sumar una puntuación al marcador

    addScore.innerHTML = `Score: ${newScore}`
}
// updateScore(50)
