function flatten(array) {
    let result = [...array];
    for (let i=0; i < result.length;){
        Array.isArray(result[i]) ? result.splice(i, 1, ...result[i]) : i++;
    }
    
    result.sort(function(a, b){
        return a - b;
    });

    return result;
}

console.log(flatten([[3, 2, 1], [4, 6, 5], [], [9, 7, 8]]));
console.log(flatten([]));
console.log(flatten([[], []]));
console.log(flatten([[], [1]]));
console.log(flatten([[1, 3, 5], [-100], [2, 4, 6]]));