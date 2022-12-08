import { readFileSync } from "fs";

const input = readFileSync("trees.txt", "utf-8");

const arr = [];

let howManyVisible = 0, width, height = 0, highestScenicScore = 0;

input.split("\n").forEach(line => {
    width = line.length;
    arr.push(line.split(''));
    height++;
});

let a = "";

for(let row = 0; row < height; row++) {
    for(let column = 0; column < width; column++) {
        if(row === 0 || column === 0 || row === height - 1 || column === width - 1) {
            howManyVisible++;
            continue;
        }
        const checkFor = arr[row][column];
        let hiddenNorth = false, hiddenSouth = false, hiddenWest = false, hiddenEast = false;
        let howManyNorth = 0, howManySouth = 0, howManyWest = 0, howManyEast = 0;

        for(let i = row - 1; i >= 0; i--) {
            howManyNorth++;
            if(checkFor <= arr[i][column] && row !== i) {
                hiddenNorth = true;
                break;
            }
        }

        for(let i = column - 1; i >= 0; i--) {
            howManyWest++;
            if(checkFor <= arr[row][i] && column !== i) {
                hiddenWest = true;
                break;
            }
        }

        for(let i = row + 1; i < height; i++) {
            howManySouth++;
            if(checkFor <= arr[i][column] && row !== i) {
                hiddenSouth = true;
                break;
            }
        }

        for(let i = column + 1; i < width; i++) {
            howManyEast++;
            if(checkFor <= arr[row][i] && column !== i) {
                hiddenEast = true;
                break;
            }
        }

        if(!(
            hiddenNorth &&
            hiddenSouth &&
            hiddenWest &&
            hiddenEast
        )) howManyVisible++;

        const checkForHighestScore = howManyNorth * howManySouth * howManyWest * howManyEast;
        if(checkForHighestScore > highestScenicScore) highestScenicScore = checkForHighestScore;
    }
}

console.log(howManyVisible, highestScenicScore)