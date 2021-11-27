function vowelCount(word){
    let match = word.match(/[aeiou]/gi);
    return match ? match.length : 0;
}

function sumDegree(n) {
    if (typeof n != 'number'
    || !Number.isInteger(n)
    || n < -200
    || n > 200) {
        return 'Invalid input';
    }
    
    let isNegative = false;
    
    if (n < 0) {
        isNegative = true;
        n = Math.abs(n);
    }
    
    let result = '';
    
    if (n == 0) {
        result = '1';
    } else {
        {
            for (var i = 0; i <= n; i++) {
                var multiplier = factorial(BigInt(n)) / (factorial(BigInt(n - i)) * factorial(BigInt(n) - BigInt(n - i)));
                if (multiplier == 1) {
                    multiplier = ''
                } else result += String(multiplier);
                
                if (n - i == 1) {
                    result += 'a';
                }
                if (n - i > 1) {
                    result += 'a' + '^' + (n - i);
                }
                if (i == 1) {
                    result += 'b';
                }
                if (i > 1) {
                    result += 'b' + '^' + (i);
                }
                if (i != n) {
                    result += ' + ';
                }
            }
        }
    }
    return isNegative ? '1 / (' + result + ')' : result;
}

function factorial(n) {
    return n ? n * factorial(n - 1n) : 1n;
}

function eleminate(num, step) {
    let list = [];
    for (let i = 0; i < num; i++) {
        list[i] = i + 1;
    }

    for (let newStep = 1; list.length > 1; newStep++) {
        let cur = list.shift();
        if (!(newStep % step == 0)) {
            list.push(cur);
        } else {
            newStep = 0;
        }
    }
    return list[0];
}

document.querySelector(".clearVowel").onclick = () => {
    document.getElementById("vowel").value = "";
    document.querySelector(".vowelResult").textContent = " ";
}

document.querySelector(".clearDegree").onclick = () => {
    document.getElementById("degree").value = "";
    document.querySelector(".degreeResult").textContent = " ";
}

document.querySelector(".clearEleminate").onclick = () => {
    document.getElementById("eleminateN").value = "";
    document.getElementById("eleminateM").value = "";
    document.querySelector(".eleminateResult").textContent = " ";
}

document.querySelector(".vowel-btn").onclick = function() {
    document.querySelector(".vowelResult").textContent = vowelCount(document.getElementById("vowel").value);
}

document.querySelector(".degree-btn").onclick = function() {
    document.querySelector(".degreeResult").textContent = sumDegree(parseInt(document.getElementById("degree").value));
}

document.querySelector(".eleminate-btn").onclick = function() {
    document.querySelector(".eleminateResult").textContent = eleminate(parseInt(document.getElementById("eleminateN").value), parseInt(document.getElementById("eleminateM").value));
}


