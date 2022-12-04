import { readFileSync } from "fs";

const input = readFileSync("pairs.txt", "utf-8");
const assignments = [];

let pairs, countPairs = 0;

input.split('\n').forEach(pair => {
    for(let i = 0; i < 2; i++) {
        assignments[i] = [];
        for(let j = 0; j < 99; j++) {
            assignments[i][j] = ".";
        }
    }

    pairs = pair.split(',');

    const betweenOne = pairs[0].split('-').map(x => parseInt(x));
    const betweenTwo = pairs[1].split('-').map(x => parseInt(x));

    for(let i = betweenOne[0]; i <= betweenOne[1]; i++) {
        assignments[0][i - 1] = i;
    }

    for(let i = betweenTwo[0]; i <= betweenTwo[1]; i++) {
        assignments[1][i - 1] = i;
    }

    let isOneInside = true, isTwoInside = true;

    for(let i = 0; i < 99; i++) {
        if(assignments[0][i] !== "." && assignments[0][i] !== assignments[1][i]) isOneInside = false;
        if(assignments[1][i] !== "." && assignments[0][i] !== assignments[1][i]) isTwoInside = false;
    }

    if(isOneInside || isTwoInside) countPairs++;
});

console.log(countPairs)