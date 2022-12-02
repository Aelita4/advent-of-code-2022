import { readFileSync } from "fs";

const input = readFileSync("rps.txt", "utf-8");

let totalScore = 0;

// A X rock 1
// B Y paper 2
// C Z scissors 3

// lose 0
// draw 3
// win 6

input.split("\n").forEach(line => {
    const arr = line.split(" ");

    totalScore += getScore(arr[0], arr[1]);
});

console.log(totalScore);

function getScore(opponent, player) {
    let score = 0;

    switch(player) {
        case "X":
            //score += 1;
            score += 0;
            break;
        case "Y":
            //score += 2;
            score += 3;
            break;
        case "Z":
            //score += 3;
            score += 6;
            break;
        
    }

    switch(opponent) {
        case "A":
            switch(player) {
                case "X":
                    //score += 3;
                    score += 3;
                    break;
                case "Y":
                    //score += 6;
                    score += 1;
                    break;
                case "Z":
                    //score += 0;
                    score += 2;
                    break;
            }
            break;
        case "B":
            switch(player) {
                case "X":
                    score += 1;
                    break;
                case "Y":
                    score += 2;
                    break;
                case "Z":
                    score += 3;
                    break;
            }
            break;
        case "C":
            switch(player) {
                case "X":
                    //score += 6;
                    score += 2;
                    break;
                case "Y":
                    //score += 0;
                    score += 3;
                    break;
                case "Z":
                    //score += 3;
                    score += 1;
                    break;
            }
            break;
    }

    return score;
}
