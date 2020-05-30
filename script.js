
const level = {
    "easy":  { 
        text: ["Enough","Bread","Check","Sail","Brought","Hotel","function","intern" ],
        currentScore: 0,
        highScore: 0,
    },

    "medium": {
        text: ["Savage","Condolence","Happiness is Key","Keep practicing","Zebra crossing","The big bad Wolf","Smallest particles"],
        currentScore: 0,
        highScore: 0,
    },

    "hard": {
        text:  [ "Restoration and Refactoring", "The Paint is too glossy", "I've got Fast Fingers!", "Chill, I'm gonna add more later"],
        currentScore: 0,
        highScore: 0,
    }
}

// input area from the DOM
const input = document.querySelector("#textInput")

// Get random number depending on game level
const randomNumber = (lvl) => {

    // Length of all questions based on level
    const length = level[lvl].text.length
    // Get Random number (Limited to the length of words list)
    const num = Math.floor(Math.random() * length)
    // Return Number
    return num
}

// Score element from DOM 
const score = document.querySelector(".game__top").querySelector(".score").querySelector("b")

// function that check inputed text
const checkType = (gameLevel) => {
    // Element of displayed text
    const displayed = document.querySelector(".game").querySelector(".text")
    // Get inputed text
    let typing = input.value
    // if display text equals typed text
    if (displayed.textContent === typing) {

        // Update Time 
        upadteTime(gameLevel)
        // Increase score by 1 in the data
        level[gameLevel].currentScore =  level[gameLevel].currentScore + 1
        // update score on the webpage
        score.textContent = level[gameLevel].currentScore
        // CLear input field
        input.value = ""
        // Set input field on focus
        input.focus()
        // Change displayed text
        changeText(gameLevel)
    }
}

// function to change text
const changeText = (gamelvl) => {
    // Text element
    const DOMText = document.querySelector(".game").querySelector("h1")
    // Display random text on the webpage
    DOMText.textContent = level[gamelvl].text[randomNumber(gamelvl)]
}

// initiate countdown varible with 10 
let countdown = 10
// Time and Difficulty Element
const [DOMTime, difficulty] = [document.querySelector(".game__top").querySelector(".time"), document.querySelector(".difficulty").querySelector("select")]


let check
// timer function 
const timer = () => {
    // if countdown equals 1
    if(countdown === 1 ) {
        // clear interval (stop interval)
        clearInterval(check)
        // Set score element to 0
        score.textContent = 0
        // upate Highscore
        updateHS(difficulty.value)
    }

    // decrease countdown
    countdown = countdown - 1 
    // Update time on the webpage
    DOMTime.querySelector("b").textContent = `${countdown}s`
}

// upadate timer every 1s
check = setInterval(timer, 1000);

// highscore element 
const DOMHighScore = document.querySelector(".highScore").querySelector("b")

// function to update highscore
const updateHS = (lvl) => {
    // get current score based of current level & chek if current score is greater that high score
    const score = level[lvl].currentScore

    const check =  score > level[lvl].highScore
    // if true
    if (check) {
        // set high score to current score
        level[lvl].highScore = score
        // display high score on the webpage
        DOMHighScore.textContent = level[lvl].highScore
    }
    // display game over page
    timeUp(lvl, check)
}

// function to update countdown time
const upadteTime = (lvl) => {
    lvl === "easy" ?  countdown = countdown + 3 : countdown = countdown + 4
}

// function to display time up page
const timeUp = (lvl, check) => {

    // game and gameOver element from DOM
    const [game, gameOver] = [document.querySelector(".game"), document.querySelector(".gameOver")]
    // Update game over element with current score on the webpage 
    gameOver.querySelector(".text").querySelector("b").textContent = level[lvl].currentScore
    // hide game container on the webpage
    game.classList.add("NoDisplay")
    // show game over container
    gameOver.classList.remove("NoDisplay")

    //if current score is greater than highscore change textContent to New HighSCore
    const container = gameOver.querySelector("span")
    check ? container.textContent = "New HighScore" : container.textContent = "Your score"

}

// function to restart interval
const intervalCheck = () => {
    clearInterval(check)
    countdown = 10
    check = setInterval(timer, 1000);
}

// function to restart game
const restart = () => {
    // element of game and gameOver from DOM
    const [game, gameOver] = [document.querySelector(".game"), document.querySelector(".gameOver")]

    // display game container
    game.classList.remove("NoDisplay")
    // hide gameOver container
    gameOver.classList.add("NoDisplay")

    // restart interval
    intervalCheck()
}

// restart game when restart button is clicked
document.getElementById("restart").addEventListener("click", restart)
// Do something when difficulty is changed 
difficulty.addEventListener("change", () => {
    // restart interval
    intervalCheck()
    // get difficulty value
    const diff = difficulty.value
    // change displayed word
    changeText(diff) 
    // clear input field
    input.value = ""
    // set input field to focus
    input.focus()
    // set current score to 0 in the data
    level[diff].currentScore = 0
    // get score element from the webpage
    const score = document.querySelector(".game__top").querySelector(".score").querySelector("b")
    // set score to 0 on the wepage
    score.textContent = 0
    // display high score based on the difficulty
    DOMHighScore.textContent = level[diff].highScore
})

// DO something while typing
input.addEventListener("keyup", () => {
    // check input input field and update scores
    checkType(difficulty.value)
})

// display high score based on the difficulty
DOMHighScore.textContent = level[difficulty.value].highScore
// set focus on input field
input.focus()