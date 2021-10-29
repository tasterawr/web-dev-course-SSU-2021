console.log("Задание 2");
function toBinary(word){
    let result = [];
    word.split("").forEach(element => {
        let binaryCode = element.charCodeAt(0).toString(2);
        result.push(new Array(8 - binaryCode.length + 1).join(0) + binaryCode);
    });

    return result;
}

console.log(toBinary("man"));
console.log(toBinary("AB"));
console.log(toBinary("wecking"));
console.log(toBinary("Ruby"));
console.log(toBinary("Yosemite"));