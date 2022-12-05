import { readFileSync } from "fs";

const input = readFileSync("stacks.txt", "utf-8");

const stacks = [];
for(let i = 0; i < 9; i++) stacks[i] = [];

const offset = 4;

let isStackInsertingDone = false, tmp;

input.split('\n').forEach(line => {
    if(line === '') {
        isStackInsertingDone = true;

        for(let i = 0; i < 9; i++) {
            stacks[i].pop();
            tmp = "";
            while(stacks[i].length > 0) tmp += stacks[i].pop();
            for(let j = 0; j < tmp.length; j++) stacks[i].push(tmp.charAt(j));
        }
    } else if(!isStackInsertingDone) {
        for(let i = 0; i < 9; i++) {
            const char = line.charAt(1 + (i * offset));
            if(char !== ' ') stacks[i].push(char);
        }
    } else {
        const splitLine = line.split(' ');

        const howMany = parseInt(splitLine[1]), from = parseInt(splitLine[3]) - 1, to = parseInt(splitLine[5]) - 1;

        for(let i = 0; i < howMany; i++) {
            stacks[to].push(stacks[from].pop());
        }
    }
});

let out = "";
for(let i = 0; i < 9; i++) out += stacks[i].pop();
console.log(out);