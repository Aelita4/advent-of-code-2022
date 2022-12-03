import { readFileSync } from "fs";

const input = readFileSync("rucksack.txt", "utf-8");

const priorities = {};

for(let i = 0; i < 26; i++) {
    priorities[String.fromCharCode(97 + i)] = i + 1;
    priorities[String.fromCharCode(65 + i)] = 26 + i + 1;
}

let prioritySum = 0;

input.split('\n').forEach(rucksack => {
    let len = rucksack.length / 2;
    const compartment = [];
    compartment[0] = rucksack.substring(0, len);
    compartment[1] = rucksack.substring(len, rucksack.length);

    let charFound = false;

    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len; j++) {
            if(compartment[0].charAt(i) === compartment[1].charAt(j) && !charFound) {
                prioritySum += priorities[compartment[0].charAt(i)];
                charFound = true;
                break;
            }
        }
    }

    console.log(prioritySum);
});