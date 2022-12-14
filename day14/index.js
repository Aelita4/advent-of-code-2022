import { readFileSync } from "fs";

const input = readFileSync("rocks.txt", "utf-8");

const field = [];
const minValues = { x: 10000, y: 10000 };
const maxValues = { x: 0, y: 0 };

input.split('\n').forEach(line => {
    const paths = line.split(" -> ");

    if(paths.length === 1) {
        const x = parseInt(paths[0].split(",")[0]);
        const y = parseInt(aths[0].split(",")[1]);
        if(typeof field[y] !== "object") field[y] = [];
        field[y][x] = "#";

        if(x > maxValues.x) maxValues.x = x;
        if(y > maxValues.y) maxValues.y = y;

        if(x < minValues.x) minValues.x = x;
        if(y < minValues.y) minValues.y = y;
    } else for(let i = 0; i < paths.length - 1; i++) {
        const from = paths[i].split(",");
        const to = paths[i + 1].split(",");

        const posFrom = { x: parseInt(from[0]), y: parseInt(from[1]) }
        const posTo = { x: parseInt(to[0]), y: parseInt(to[1]) }

        if(posFrom.x === posTo.x) for(let y = Math.min(posFrom.y, posTo.y); y <= Math.max(posFrom.y, posTo.y); y++) {
            const x = posFrom.x;
            if(typeof field[y] !== "object") field[y] = [];
            field[y][x] = "#";

            if(x > maxValues.x) maxValues.x = x;
            if(y > maxValues.y) maxValues.y = y;

            if(x < minValues.x) minValues.x = x;
            if(y < minValues.y) minValues.y = y;
        } 
        if(posFrom.y === posTo.y) for(let x = Math.min(posFrom.x, posTo.x); x <= Math.max(posFrom.x, posTo.x); x++) {
            const y = posFrom.y;
            if(typeof field[y] !== "object") field[y] = [];
            field[y][x] = "#";

            if(x > maxValues.x) maxValues.x = x;
            if(y > maxValues.y) maxValues.y = y;

            if(x < minValues.x) minValues.x = x;
            if(y < minValues.y) minValues.y = y;
        } 
    }
});

const newField = [];

for(let y = 0; y <= maxValues.y; y++) {
    newField[y] = [];
    for(let x = minValues.x; x <= maxValues.x; x++) {
        if(typeof field[y] !== "object") field[y] = [];
        newField[y][x - minValues.x] = field[y][x] ?? "."
    }
}
newField[0][500 - minValues.x] = "+";

let canStillFall = true;
let countSand = 0;

while(true) {
    if(!canStillFall) break;
    let currentX = 500 - minValues.x;
    let currentY = 0;

    while(true) {
        if(typeof newField[currentY + 1]?.[currentX] === "undefined") {
            canStillFall = false;
            break;
        }
        else if(newField[currentY + 1][currentX] === ".") {
            currentY++;
        } else {
            if(typeof newField[currentY + 1]?.[currentX - 1] === "undefined") {
                canStillFall = false;
                break;
            } else if(typeof newField[currentY + 1]?.[currentX + 1] === "undefined") {
                canStillFall = false;
                break;
            }

            if(newField[currentY + 1][currentX - 1] === ".") {
                currentY++;
                currentX--;
            } else if(newField[currentY + 1][currentX + 1] === ".") {
                currentY++;
                currentX++;
            } else {
                newField[currentY][currentX] = "o";
                countSand++;
                break;
            }
        }
    }
}

console.log(countSand)