import { readFileSync } from "fs";

const input = readFileSync("movements.txt", "utf-8");

function isTailAdjacentToHead(head, tail) {
    if(Math.abs(tail.x - head.x) > 1) return false;
    if(Math.abs(tail.y - head.y) > 1) return false;
    return true;
}

const head = { x: 0, y: 0}, tail = { x: 0, y: 0 };

const visited = new Map([[ `0:0`, true ]]);

input.split('\n').forEach(line => {
    const operations = line.split(' ');

    let x = 0, y = 0;

    switch(operations[0]) {
        case "U":
            y++;
            break;
        case "D":
            y--;
            break;
        case "L":
            x--;
            break;
        case "R":
            x++;
            break;
    }

    for(let i = 0; i < parseInt(operations[1]); i++) {
        const oldHead = {};
        oldHead.x = head.x;
        oldHead.y = head.y;

        head.x += x;
        head.y += y;

        if(!isTailAdjacentToHead(head, tail)) {
            tail.x = oldHead.x;
            tail.y = oldHead.y;

            visited.set(`${tail.x}:${tail.y}`, true);
        }
    }
});

console.log(visited.size);