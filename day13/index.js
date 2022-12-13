import { readFileSync } from "fs";

const input = readFileSync("packets.txt", "utf-8");

function compareArrays(left, right) {
    let index = 0;

    while(true) {
        if(typeof left[index] === "undefined" && typeof right[index] === "undefined") return 0;
        else if(typeof left[index] === "undefined") return 1;
        else if(typeof right[index] === "undefined") return -1;
        else if(typeof left[index] === "object" && typeof right[index] === "object") {
            let a = compareArrays(left[index], right[index]);
            if(a === 1 || a === -1) return a;
        }
        else if(typeof left[index] === "object" && typeof right[index] === "number") {
            let a = compareArrays(left[index], [right[index]]);
            if(a === 1 || a === -1) return a;
        }
        else if(typeof left[index] === "number" && typeof right[index] === "object") {
            let a = compareArrays([left[index]], right[index]);
            if(a === 1 || a === -1) return a;
        }
        else if(typeof left[index] === "number" && typeof right[index] === "number" && left[index] !== right[index]) return left[index] < right[index] ? 1 : -1
        
        index++;
    }
}

let sum = 0;
let currentPair = 1;

input.split('\n\n').forEach(line => {
    const pair = line.split('\n');
    if(compareArrays(JSON.parse(pair[0]), JSON.parse(pair[1])) === 1) sum += currentPair;
    currentPair++;
});

console.log(sum)