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
let maxWrongGuesses = 6;
let wrongGuesses = 0;
let answer = "";
let guessedLetters = [];

let startButton = document.getElementById("btn-start");
let mainMenuPage = document.getElementById("mainMenu");
let mainGameField = document.getElementById("mainGameField");
let engCb = document.getElementById("langCb");

//--------------START GAME FUNCTION
startButton.addEventListener('click', function(){
    questionsType = document.getElementById("questionTypes").value;
    roomType = document.getElementById("roomTypes").value;
    document.getElementById("maxWrongGuesses").innerHTML = maxWrongGuesses;

    switchPages(mainMenuPage, mainGameField);
    update();
    selectQuestion();
    loadRusKeyboard(handleGuess);
    loadEngKeyboard(handleGuess);
    setDifficulty();
    console.log("Game field configured successfully.");
});

engCb.addEventListener('change', function(){
    document.getElementById("engKeyboard").classList.toggle("hidden");
})

function setDifficulty(){
    difficulty = document.getElementById("difficultyTypes").value;
    if (difficulty === "easy"){
        document.getElementById("timerField").classList.add("hidden");
    } else if (difficulty === "medium"){
        timer.enableTimer(45);
    } else if (difficulty === "hard"){
        timer.enableTimer(30);
    } else {
        timer.enableTimer(30);
    }
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

