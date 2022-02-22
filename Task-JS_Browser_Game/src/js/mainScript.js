import {loadRusKeyboard} from '../js/keyboardLoader.js';
import {loadEngKeyboard} from '../js/keyboardLoader.js';
import * as gameDataUpdate from '../js/gameDataUpdate.js';
import * as timer from '../js/timer.js';
import * as gd from '../js/gameDefaults.js';

//--------GENERAL GAME DATA------------
export let questionsType = null;
export let roomType = null;
export let difficulty = "";
export let difficultyName = "";
export let questionsTypeName = "";
export let questionsTakenCtr = 0;

//--------SINGLE LEVEL DATA-------------
export let wrongGuesses = 0;
export let answer = "";
export let guessedLetters = [];
export let startGameIntervalId = null; 

let startButton = document.getElementById("btn-start");
let nextLevelButton = document.getElementById("btn-next");
let returnToMenuButton = document.getElementById("btn-menu");
let mainMenuPage = document.getElementById("mainMenu");
let mainGameField = document.getElementById("mainGameField");
let engCb = document.getElementById("langCb");

//--------------BUTTON LISTENERS-----------------------------
startButton.addEventListener('click', startGame);
nextLevelButton.addEventListener('click', nextLevel);
returnToMenuButton.addEventListener('click', returnToMenu);

function startGame(){
    let sel = document.getElementById("questionTypes");
    questionsType = sel.value;
    questionsTypeName = sel.options[sel.selectedIndex].text;
    roomType = document.getElementById("roomTypes").value;
    document.getElementById("maxWrongGuesses").innerHTML = gd.MAX_WRONG_GUESSES;

    switchPages(mainMenuPage, mainGameField);
    update();
    selectQuestion();
    loadRusKeyboard(handleGuess);
    loadEngKeyboard(handleGuess);
    setDifficulty();
    startGameIntervalId = setInterval(testEndGame, 500);
    console.log("Game field configured successfully.");
}

engCb.addEventListener('change', function(){
    document.getElementById("engKeyboard").classList.toggle("hidden");
})

function setDifficulty(){
    let sel = document.getElementById("difficultyTypes");
    difficulty = sel.value;
    difficultyName = sel.options[sel.selectedIndex].text;
    
    document.getElementById("timerField").classList.remove("hidden");
    if (difficulty === "easy"){
        document.getElementById("timerField").classList.add("hidden");
    } else if (difficulty === "medium"){
        timer.enableTimer(45);
    } else if (difficulty === "hard"){
        timer.enableTimer(30);
    } else {
        timer.enableTimer(30);
    }

    console.log("Difficulty set to " + difficulty + ".")
}

function selectQuestion(){
    let questionsForType = [];
    for (let i = 0; i < gd.QUESTIONS.length; i++){
        if (gd.QUESTIONS[i].startsWith(questionsType)){
            questionsForType.push(gd.QUESTIONS[i]);
        }
    }

    let question = questionsForType[Math.floor(Math.random() * questionsForType.length)].split('_');
    document.getElementById("questionText").innerHTML = question[1];
    answer = question[2];
    document.getElementById("numOfLetters").innerHTML = answer.length;
    update();
}

function updateTimer(){
    if (difficulty === "medium"){
        timer.addToTime(5);
    } else if (difficulty === "hard"){
        timer.addToTime(2);
    }
}

function switchPages(pageToClose, pageToOpen){
    pageToClose.hidden = true;
    pageToOpen.hidden = false;
}

function handleGuess(evt){
    let letter = evt.currentTarget.param;
    if (guessedLetters.includes(letter)){
        return;
    }

    if (answer.includes(letter)){
        guessedLetters.push(letter);
        updateTimer();
    } else {
        wrongGuesses++;
    }

    update();
}

function update(){
    gameDataUpdate.updateData(roomType, wrongGuesses, answer, guessedLetters);
}

function testEndGame(){
    const guessed = document.getElementById("guessedLettersCtr").innerHTML;

    if (parseInt(guessed) === answer.length){
        performWinLogic();
    } else if (wrongGuesses === gd.MAX_WRONG_GUESSES || timer.timeIsOut()){
        performLoseLogic();
    }
}

function performWinLogic(){
    clearInterval(startGameIntervalId);
    timer.disableTimer();
    questionsTakenCtr++;
    document.getElementById("resultTitle").innerHTML = gd.WIN_MESSAGE;
    document.getElementById("btn-next").classList.remove("hidden");
    setStats();

    const gameField = document.getElementById("mainGameField");
    const endGameField = document.getElementById("endLevelScreen");
    switchPages(gameField, endGameField);
}

function performLoseLogic(){
    clearInterval(startGameIntervalId);
    timer.disableTimer();
    questionsTakenCtr++;
    document.getElementById("resultTitle").innerHTML = gd.LOSE_MESSAGE;
    document.getElementById("btn-next").classList.add("hidden");
    setStats();

    const gameField = document.getElementById("mainGameField");
    const endGameField = document.getElementById("endLevelScreen");
    switchPages(gameField, endGameField);
}

function nextLevel(){
    const gameField = document.getElementById("mainGameField");
    const winGameField = document.getElementById("endLevelScreen");
    switchPages(winGameField, gameField);
    document.getElementById("guessedLettersCtr").innerHTML = 0;
    guessedLetters = [];
    wrongGuesses = 0;
    startGame();
}

function returnToMenu(){
    document.getElementById("guessedLettersCtr").innerHTML = 0;
    questionsTakenCtr = 0;
    guessedLetters = [];
    wrongGuesses = 0;
    const mainMenu = document.getElementById("mainMenu");
    const winGameField = document.getElementById("endLevelScreen");
    switchPages(winGameField, mainMenu);
}

function setStats(){
    if (wrongGuesses > 6){
        wrongGuesses = 6;
    }

    document.getElementById("endGamePic").src = "images/content/" + roomType + "/" + roomType + wrongGuesses + ".png";
    document.getElementById("questionsTakenCtr").innerHTML = questionsTakenCtr;
    document.getElementById("difficultyName").innerHTML = difficultyName;
    document.getElementById("questionsTypeName").innerHTML = questionsTypeName;
}

