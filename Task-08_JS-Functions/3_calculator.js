function count(b, operator, a) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return Math.floor(a / b);
    }
}
function plus(func) {
    return [func, '+'];
}
function minus(func) {
    return [func, '-'];
}
function times(func) {
    return [func, '*'];
}
function dividedBy(func) {
    return [func, '/'];
}

function zero(func) {
    return typeof func != "undefined" ? count(func[0], func[1], 0) : 0;
}
function one(func) {
    return typeof func != "undefined" ? count(func[0], func[1], 1) : 1;
}
function two(func) {
    return typeof func != "undefined" ? count(func[0], func[1], 2) : 2;
}
function three(func) {
    return typeof func != "undefined" ? count(func[0], func[1], 3) : 3;
}
function four(func) {
    return typeof func != "undefined" ? count(func[0], func[1], 4) : 4;
}
function five(func) {
    return typeof func != "undefined" ? count(func[0], func[1], 5) : 5;
}
function six(func) {
    return typeof func != "undefined" ? count(func[0], func[1], 6) : 6;
}
function seven(func) {
    return typeof func != "undefined" ? count(func[0], func[1], 7) : 7;
}
function eight(func) {
    return typeof func != "undefined" ? count(func[0], func[1], 8) : 8;
}
function nine(func) {
    return typeof func != "undefined" ? count(func[0], func[1], 9) : 9;
}



console.log("Calculator: ")
console.log(seven(times(five())));
console.log(four(plus(nine())));
console.log(eight(minus(three())));
console.log(six(dividedBy(two())));
console.log(eight(dividedBy(three())));
console.log(three(times(three(times(three())))));
console.log(two(plus(two(times(two(minus(one())))))));
console.log(zero(plus(one(dividedBy(one())))));
console.log(one(dividedBy(zero())));
console.log(one());
