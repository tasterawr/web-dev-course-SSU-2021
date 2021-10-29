console.log("Задание 4");
function format(input){
    return input.split("").map(function(element, index){ 
        return element.toUpperCase() + element.repeat(index);
    }).join("-");
}

console.log(format("abcd"));
console.log(format("RqaEzty"));
console.log(format("cwAt"));