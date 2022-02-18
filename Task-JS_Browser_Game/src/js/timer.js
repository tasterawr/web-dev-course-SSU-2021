let time = 0;
var intervalId = null;

const timerEl = document.getElementById('timer');

function updateTimer(){
    if (time < 0) return;
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerEl.innerHTML = minutes + ":" + seconds;
    time--;
}

export function enableTimer(seconds){
    time = seconds;
    intervalId = setInterval(updateTimer, 1000);
}

export function disableTimer(){
    clearInterval(intervalId);
}

export function addToTime(sec) {
    time = time + sec;
}

export function timeIsOut(){
    return time <= 0;
}