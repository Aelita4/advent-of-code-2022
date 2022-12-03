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

console.log();

let countdown = 0, badgesSum = 0;
const group = []

input.split('\n').forEach(rucksack => {
    group[countdown++] = rucksack;

    if(countdown === 3) {
        countdown = 0;
        let charFound = false;

        for(let i = 0; i < group[0].length; i++) {
            for(let j = 0; j < group[1].length; j++) {
                for(let k = 0; k < group[2].length; k++) {
                    if(
                      group[0].charAt(i) === group[1].charAt(j) &&
                      group[1].charAt(j) === group[2].charAt(k) &&
                      group[2].charAt(k) === group[0].charAt(i) &&  
                      !charFound
                    ) {
                        badgesSum += priorities[group[0].charAt(i)];
                        charFound = true;
                        break;
                    }
                }
            }
        }

        console.log(badgesSum);
    }
});