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

console.log("Elemination game: ");
console.log(eleminate(7, 3));
console.log(eleminate(11, 19));
console.log(eleminate(1, 300));
console.log(eleminate(14, 2));
console.log(eleminate(100, 1));