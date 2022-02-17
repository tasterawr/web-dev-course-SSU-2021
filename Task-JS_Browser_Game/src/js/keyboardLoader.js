export function loadRusKeyboard(handleGuess){
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
}

export function loadEngKeyboard(handleGuess){
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
}