function format(array) {
    let pattern = "+7 (___) ___-__-__";

    if (array.length != 10 || !array.every(number => number >= 0)) {
        return 'Invalid input';
    }
    for (var i = 0; i < array.length; i++) {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(array[i])
            ? pattern = pattern.replace('_', array[i])
            : 'Invalid input'
    }
    return pattern;
}

console.log("Format the phone number: ")
console.log(format([9, 0, 0, 1, 1, 1, 2, 2, 3, 3]));
console.log(format([9, 2, 7, 5, 5, 5, 6, 6, 9, 0]));
console.log(format([1, 2, 3, 4, 5, 6, 7, 8, 9, -11]));
console.log(format([]));
console.log(format('aw93fha='));