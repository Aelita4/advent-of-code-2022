import { readFileSync } from "fs";

const input = readFileSync("calories.txt", "utf-8");

const elves = [];

let elfNum = 0;
let isFirst = true;

input.split("\r\n").forEach(line => {
    if(line === "") {
        elfNum++;
        isFirst = true;
    } else {
        if(isFirst) {
            isFirst = false;
            elves[elfNum] = parseInt(line);
        } else elves[elfNum] += parseInt(line);
    }
});

let maxCalories = [0, 0, 0];

elves.forEach(elf => {
    if(elf > maxCalories[0]) {
        maxCalories[2] = maxCalories[1];
        maxCalories[1] = maxCalories[0];
        maxCalories[0] = elf;
    }
});

console.log(`Elf with most calories: ${maxCalories[0]}`);
console.log(`Top 3 elves calories: ${maxCalories.reduce((e, acc) => acc += e)}`);