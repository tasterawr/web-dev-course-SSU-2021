console.log("Задание 3");
function vowelCount(word){
    let match = word.match(/[aeiou]/gi);
    return match ? match.length : 0;
}

console.log(vowelCount("abracadabra"));
console.log(vowelCount("ABRACADABRA"));
console.log(vowelCount("o a kak ushakov lil vo kashu kakao"));
console.log(vowelCount("my pyx"));
