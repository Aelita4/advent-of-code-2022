import { readFileSync } from "fs";

const input = readFileSync("instructions.txt", "utf-8");

let display = "";

function drawCRT(cycle, pointer) {
    if((cycle - 1) % 40 === 0) display += "\n"

    if(Math.abs(((cycle - 1) % 40) - pointer) <= 1) display += "#";
    else display += ".";
}

let xRegister = 1;
let cycle = 0;

input.split('\n').forEach(line => {
    const instruction = line.split(' ');

    switch(instruction[0]) {
        case "noop":
            cycle++;
            drawCRT(cycle, xRegister);
            break;
        case "addx":
            cycle++;
            drawCRT(cycle, xRegister);
            cycle++;
            drawCRT(cycle, xRegister);
            xRegister += parseInt(instruction[1]);
            break;
    }


});

console.log(display)