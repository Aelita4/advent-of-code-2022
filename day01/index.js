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

let maxCalories = 0;

elves.forEach(elf => {
    if(elf > maxCalories) maxCalories = elf;
});

console.log(maxCalories);