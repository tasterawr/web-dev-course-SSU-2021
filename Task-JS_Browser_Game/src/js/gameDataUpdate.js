function updatePictureStatus(roomType, wrongGuesses){
    document.getElementById("gameFieldPic").src = "images/content/" + roomType + "/" + roomType + wrongGuesses + ".png";
}

function updateAnswerStatus(answer, guessedLetters){
    let rightGuesses = 0;
    var newStatus = answer.split('').map(letter => {
        if (guessedLetters.indexOf(letter) >= 0){
            rightGuesses++;
            return letter;
        } else return " _ ";
    }).join('');
    document.getElementById("guessedLettersCtr").innerHTML = rightGuesses;
    document.getElementById("answerStatus").innerHTML = newStatus;
}

function updateWrongGuesses(wrongGuesses){
    document.getElementById("wrongGuessesCnt").innerHTML = wrongGuesses;
}

export function updateData(roomType, wrongGuesses, answer, guessedLetters){
    updateWrongGuesses(wrongGuesses);
    updatePictureStatus(roomType, wrongGuesses);
    updateAnswerStatus(answer, guessedLetters);
}