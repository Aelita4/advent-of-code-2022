import { readFileSync } from "fs";

const input = readFileSync("datastream.txt", "utf-8");

function checkForDuplicates(arr, howMany) {
    const map = new Map();
    
    arr.forEach(char => {
        map.set(char, true);
    });

    return map.size === howMany;
}

const arr1 = new Array(4).fill('');
const arr2 = new Array(14).fill('');
let i = 1, startOfPacket = 0, startOfMessage = 0;


console.log(arr1)
for(const char of input) {
    arr1.shift()
    arr1.push(char);

    arr2.shift()
    arr2.push(char);
    
    if(startOfPacket === 0 && i > 4 && checkForDuplicates(arr1, 4)) startOfPacket = i;
    if(startOfMessage === 0 && i > 14 && checkForDuplicates(arr2, 14)) startOfMessage = i;
    
    i++;
}

console.log(startOfPacket, startOfMessage);