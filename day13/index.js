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

const inputs = [];

const beforeTwo = [];
const between = []
const afterSix = [];

input.split('\n\n').forEach(line => {
    const pair = line.split('\n');
    inputs.push(pair[0])
    inputs.push(pair[1])
});

inputs.forEach(i => {
    if(compareArrays(JSON.parse(i), JSON.parse("[[2]]")) === 1) beforeTwo.push(i);
    else if(compareArrays(JSON.parse("[[6]]"), JSON.parse(i)) === 1) afterSix.push(i);
    else between.push(i)
})

console.log((beforeTwo.length + 1) * (beforeTwo.length + between.length + 2))