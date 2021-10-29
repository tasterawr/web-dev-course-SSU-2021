console.log("Задание 5");
function isIsogram(word){
    return word.length === new Set(word.toLowerCase()).size;
}

console.log(isIsogram("Dermatoglyphics"));
console.log(isIsogram("aba"));
console.log(isIsogram("moOse"));
console.log(isIsogram(""));