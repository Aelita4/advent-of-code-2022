import { readFileSync } from "fs";

const input = readFileSync("datastream.txt", "utf-8");

function checkForDuplicates(arr) {
    const map = new Map();
    
    arr.forEach(char => {
        map.set(char, true);
    });

    return map.size === 4;
}

const arr = ['', '', '', ''];
let i = 1;

for(const char of input) {
    arr.shift()
    arr.push(char);
    
    if(i > 4 && checkForDuplicates(arr)) break;
    
    i++;
}

console.log(i);