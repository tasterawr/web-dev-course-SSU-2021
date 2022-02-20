import {loadRusKeyboard} from '../js/keyboardLoader.js';
import {loadEngKeyboard} from '../js/keyboardLoader.js';
// import {updatePictureStatus} from '../js/gameDataUpdate.js';
// import {updateAnswerStatus} from '../js/gameDataUpdate.js';
import * as gameDataUpdate from '../js/gameDataUpdate.js';
import * as timer from '../js/timer.js';

let questions = [ 
    'it_Принцип ООП, согласно которому переопределенные методы класса могут предоставлять различное поведение при общем базовом интерфейсе (рус.)_полиморфизм',
    'it_Змеиный язык (англ.)_python',
    'it_Структура данных, реализующая принцип FIFO (рус.)_очередь',
    'it_Аббревиатура принципа неповторяемости написанного кода (англ.)_dry',
    'it_Насекомое, поселяющееся в программном коде (рус.)_баг',
    'it_Дизайн паттерн, при котором используется единственная сущность класса (англ.)_singleton',
    "it_Аббревиатура, комплекс программных средств, используемый программистами для разработки ПО (англ.)_ide",
    "it_Специалист, занимающийся испытаниями ПО с целью выявления несоответствий между ожидаемым и полученным результатом (рус.)_тестировщик",
    "it_Жизненный цикл проекта, для которого характерно следование последовательным стадиям (рус.)_водопад",
    "it_Текстовое описание кода состояния HTTP 403 (англ.)_forbidden",
    "music_Музыкальное произведение в исполнении другого музыканта (рус.)_кавер",
    "music_Круглый металлический инструмент, зачастую является элементом барабана (рус.)_тарелка",
    "music_Высокий мужской певческий голос (рус.)_тенор",
    "music_Одновременное сочетание трех и более нот (рус.)_аккорд",
    "music_Имя барабанщика The Beatles (англ.)_ringo",
    "music_Пение без инструментального сопровождения (рус.)_акапелла",
    "music_Легендарная песня группы Metallica, обозначающая цифру (англ.)_one",
    "music_Небольшой оцифрованный фрагмент песни, часто использующийся при составлении ремиксов (рус.)_сэмпл",
    "music_Автор строки \"now you're just somebody that I used to know\" (англ.)_gotye",
    "music_Автор песни Rap God (англ.)_eminem",
    "cinema_Освобожденный персонаж из фильма Квентина Тарантино (рус.)_джанго",
    "cinema_Фамилия главного героя фильма \"Лицо со шрамом\" (рус.)_монтана",
    "cinema_Имя персонажа, который не мог бегать, но впоследствии обежал всю страну (рус.)_форрест",
    "cinema_Процесс озвучивания персонажей на другом языке и последующего наложения записанного текста (рус.)_дубляж",
    "cinema_Специалист, ответственный за изобразительное решение фильма и фотографическое качество изображения (рус.)_оператор" ]

let questionsType = null;
let roomType = null;

let difficulty = "";
let difficultyName = "";
let questionsTypeName = "";
let maxWrongGuesses = 6;
let wrongGuesses = 0;
let answer = "";
let guessedLetters = [];
let questionsTakenCtr = 0;
let startGameIntervalId = null;

let startButton = document.getElementById("btn-start");
let nextLevelButton = document.getElementById("btn-next");
let returnToMenuButton = document.getElementById("btn-menu");
let mainMenuPage = document.getElementById("mainMenu");
let mainGameField = document.getElementById("mainGameField");
let engCb = document.getElementById("langCb");

//--------------BUTTON LISTENERS
startButton.addEventListener('click', startGame);
nextLevelButton.addEventListener('click', nextLevel);
returnToMenuButton.addEventListener('click', returnToMenu);

function startGame(){
    var sel = document.getElementById("questionTypes");
    questionsType = sel.value;
    questionsTypeName = sel.options[sel.selectedIndex].text;
    roomType = document.getElementById("roomTypes").value;
    document.getElementById("maxWrongGuesses").innerHTML = maxWrongGuesses;

    switchPages(mainMenuPage, mainGameField);
    update();
    selectQuestion();
    loadRusKeyboard(handleGuess);
    loadEngKeyboard(handleGuess);
    setDifficulty();
    startGameIntervalId = setInterval(checkEndGame, 500);
    console.log("Game field configured successfully.");
}

engCb.addEventListener('change', function(){
    document.getElementById("engKeyboard").classList.toggle("hidden");
})

function setDifficulty(){
    var sel = document.getElementById("difficultyTypes");
    difficulty = sel.value;
    difficultyName = sel.options[sel.selectedIndex].text;
    if (difficulty === "easy"){
        document.getElementById("timerField").classList.add("hidden");
    } else if (difficulty === "medium"){
        timer.enableTimer(45);
    } else if (difficulty === "hard"){
        timer.enableTimer(30);
    } else {
        timer.enableTimer(30);
    }

    console.log("Difficulty set to" + difficulty + ".")
}

function selectQuestion(){
    var questionsForType = [];
    for (let i = 0; i < questions.length; i++){
        if (questions[i].startsWith(questionsType)){
            questionsForType.push(questions[i]);
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

function checkEndGame(){
    const guessed = document.getElementById("guessedLettersCtr").innerHTML;

    if (parseInt(guessed) === answer.length){
        performWinLogic();
    }
}

function performWinLogic(){
    clearInterval(startGameIntervalId);
    timer.disableTimer();
    questionsTakenCtr++;
    const gameField = document.getElementById("mainGameField");
    const winGameField = document.getElementById("endLevelScreen");
    switchPages(gameField, winGameField);
    document.getElementById("endGamePic").src = "images/content/" + roomType + "/" + roomType + wrongGuesses + ".png";
    setStats();
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
    document.getElementById("questionsTakenCtr").innerHTML = questionsTakenCtr;
    document.getElementById("difficultyName").innerHTML = difficultyName;
    document.getElementById("questionsTypeName").innerHTML = questionsTypeName;
}

