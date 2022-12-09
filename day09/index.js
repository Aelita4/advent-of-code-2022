import { readFileSync } from "fs";

const input = readFileSync("movements.txt", "utf-8");

function isTailAdjacentToHead(head, tail) {
    if(Math.abs(tail.x - head.x) > 1) return false;
    if(Math.abs(tail.y - head.y) > 1) return false;
    return true;
}

const initX = 11, initY = 5;
const rope = [
    { x: initX, y: initY },
    { x: initX, y: initY },
    { x: initX, y: initY },
    { x: initX, y: initY },
    { x: initX, y: initY },
    { x: initX, y: initY },
    { x: initX, y: initY },
    { x: initX, y: initY },
    { x: initX, y: initY },
    { x: initX, y: initY }
];

const visited = new Map();

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
        rope[0].x += x;
        rope[0].y += y;

        for(let ropeIndex = 1; ropeIndex < rope.length; ropeIndex++) {
            if(!isTailAdjacentToHead(rope[ropeIndex - 1], rope[ropeIndex])) {
                if(rope[ropeIndex - 1].x !== rope[ropeIndex].x && rope[ropeIndex - 1].y !== rope[ropeIndex].y) {
                    rope[ropeIndex].x += (rope[ropeIndex - 1].x - rope[ropeIndex].x) > 0 ? 1 : -1;
                    rope[ropeIndex].y += (rope[ropeIndex - 1].y - rope[ropeIndex].y) > 0 ? 1 : -1;
                } else if(rope[ropeIndex - 1].x === rope[ropeIndex].x) {
                    rope[ropeIndex].y += (rope[ropeIndex - 1].y - rope[ropeIndex].y) > 0 ? 1 : -1;
                } else if(rope[ropeIndex - 1].y === rope[ropeIndex].y) {
                    rope[ropeIndex].x += (rope[ropeIndex - 1].x - rope[ropeIndex].x) > 0 ? 1 : -1;
                }
            }            
        }
        visited.set(`${rope[rope.length - 1].x}:${rope[rope.length - 1].y}`, true);
    }   
});

console.log(visited.size);