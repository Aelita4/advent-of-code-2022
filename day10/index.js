import { readFileSync } from "fs";

const input = readFileSync("instructions.txt", "utf-8");

let xRegister = 1;
let cycle = 0;
let strengthSum = 0;

input.split('\n').forEach(line => {
    const instruction = line.split(' ');

    switch(instruction[0]) {
        case "noop":
            cycle++;
            if((cycle + 20) % 40 === 0) strengthSum += (cycle * xRegister);
            break;
        case "addx":
            cycle++;
            if((cycle + 20) % 40 === 0) strengthSum += (cycle * xRegister);
            cycle++;
            
            if((cycle + 20) % 40 === 0) strengthSum += (cycle * xRegister);
            xRegister += parseInt(instruction[1]);
            break;
    }
});

console.log(strengthSum)