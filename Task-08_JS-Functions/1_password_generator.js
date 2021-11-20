function randomInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
function arrayRandElement(arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function generate() {
  let numbers = "0123456789";
  let upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowerLetters = "abcdefghiklmnopqrstuvwxyz";

  let length = randomInt(6, 20);
  let result = arrayRandElement(numbers) + arrayRandElement(upperLetters) + arrayRandElement(lowerLetters);

  let array = [];
  array = array.concat(numbers.split(""))
    .concat(upperLetters.split(""))
    .concat(lowerLetters.split(""));

  while (result.length < length) {
    result += array[randomInt(0, array.length - 1)];
  }

  let password = shuffle(result.split("")).join("");

  return password;
}

console.log("Password generator: ")
console.log(generate())
console.log("");