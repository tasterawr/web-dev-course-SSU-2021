let rusKeyboardLoaded = false;
let engKeyboardLoaded = false;

export function loadRusKeyboard(handleGuess){
    if (rusKeyboardLoaded) return;

    let alphabetString = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    let buttonsHTML = alphabetString.split('').map(letter =>
        `
            <button class="btn-keyboard" id="` + letter + `" > ` + letter + ` </button>
        `).join('');

    document.getElementById("rusKeyboard").innerHTML = buttonsHTML;

    let letters = alphabetString.split('');
    for (let i = 0; i < letters.length; i++){
        let button = document.getElementById(letters[i]);
        button.addEventListener('click', handleGuess, false);
        button.param = letters[i];
    }

    rusKeyboardLoaded = true;
    console.log("Russian keyboard loaded successfully.")
}

export function loadEngKeyboard(handleGuess){
    if (engKeyboardLoaded) return;

    let alphabetString = 'abcdefghijklmnopqrstuvwxyz';
    let buttonsHTML = alphabetString.split('').map(letter =>
        `
            <button class="btn-keyboard" id="` + letter + `" > ` + letter + ` </button>
        `).join('');

    document.getElementById("engKeyboard").innerHTML = buttonsHTML;

    let letters = alphabetString.split('');
    for (let i = 0; i < letters.length; i++){
        let button = document.getElementById(letters[i]);
        button.addEventListener('click', handleGuess, false);
        button.param = letters[i];
    }

    engKeyboardLoaded = true;
    console.log("English keyboard loaded successfully.")
}