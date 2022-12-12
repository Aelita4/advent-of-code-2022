import { readFileSync } from "fs";

const input = readFileSync("heightmap.txt", "utf-8");

function BFS(map, visited = [], toCheck = [], endingPos, dimensions) {
    const whereFrom = {};
    whereFrom[visited[0]] = null;

    while(toCheck.length > 0) {
        const positionString = toCheck.shift();
        const positionObj = { x: parseInt(positionString.split(":")[0]), y: parseInt(positionString.split(":")[1])};

        if(positionObj.x - 1 >= 0 && (
            (map[positionObj.y][positionObj.x - 1].charCodeAt(0) - map[positionObj.y][positionObj.x].charCodeAt(0)) === 1 ||
            (map[positionObj.y][positionObj.x - 1].charCodeAt(0) - map[positionObj.y][positionObj.x].charCodeAt(0)) < 1
        )) {
            const str = `${positionObj.x - 1}:${positionObj.y}`;
            if(!visited.includes(str)) {
                toCheck.push(str);
                visited.push(str);
                whereFrom[str] = positionString;
            }
        }

        if(positionObj.x + 1 < dimensions.width && (
            (map[positionObj.y][positionObj.x + 1].charCodeAt(0) - map[positionObj.y][positionObj.x].charCodeAt(0)) === 1 ||
            (map[positionObj.y][positionObj.x + 1].charCodeAt(0) - map[positionObj.y][positionObj.x].charCodeAt(0)) < 1
        )) {
            const str = `${positionObj.x + 1}:${positionObj.y}`;
            if(!visited.includes(str)) {
                toCheck.push(str);
                visited.push(str);
                whereFrom[str] = positionString;
            }
        }

        if(positionObj.y - 1 >= 0 && (
            (map[positionObj.y - 1][positionObj.x].charCodeAt(0) - map[positionObj.y][positionObj.x].charCodeAt(0)) === 1 ||
            (map[positionObj.y - 1][positionObj.x].charCodeAt(0) - map[positionObj.y][positionObj.x].charCodeAt(0)) < 1
        )) {
            const str = `${positionObj.x}:${positionObj.y - 1}`;
            if(!visited.includes(str)) {
                toCheck.push(str);
                visited.push(str);
                whereFrom[str] = positionString;
            }
        }

        if(positionObj.y + 1 < dimensions.height && (
            (map[positionObj.y + 1][positionObj.x].charCodeAt(0) - map[positionObj.y][positionObj.x].charCodeAt(0)) === 1 ||
            (map[positionObj.y + 1][positionObj.x].charCodeAt(0) - map[positionObj.y][positionObj.x].charCodeAt(0)) < 1
        )) {
            const str = `${positionObj.x}:${positionObj.y + 1}`;
            if(!visited.includes(str)) {
                toCheck.push(str);
                visited.push(str);
                whereFrom[str] = positionString;
            }
        }

        if(positionObj.x === endingPos.x && positionObj.y === endingPos.y) {
            let count = 0;
            let currentPoint = positionString;

            while(1) {
                currentPoint = whereFrom[currentPoint]
                if(currentPoint === null) break;
                count++;
            }

            console.log(count)
            break;
        }
    }
}

let index = 0;

const heightMap = [];
const start = { x: 0, y: 0 };
const end = { x: 0, y: 0 };

input.split('\n').forEach(line => {
    heightMap[index] = [...line.split("")];
    if(line.includes("S")) { 
        const startingIndex = heightMap[index].indexOf("S")
        heightMap[index][startingIndex] = "a";
        start.x = startingIndex;
        start.y = index;
    }
    if(line.includes("E")) { 
        const endingIndex = heightMap[index].indexOf("E")
        heightMap[index][endingIndex] = "z";
        end.x = endingIndex;
        end.y = index;
    }
    index++;
});

BFS(heightMap, [`${start.x}:${start.y}`], [`${start.x}:${start.y}`], end, { height: index, width: heightMap[0].length });