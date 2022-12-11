import { readFileSync } from "fs";

const input = readFileSync("monkeys.txt", "utf-8");

function resolveOperation(num, oper) {
    oper = oper.split(" = ")[1];
    if(oper.includes("+")) {
        const number = oper.split(" + ")[1];
        num += number.includes("old") ? num : parseInt(number);
    } else {
        const number = oper.split(" * ")[1];
        num *= number.includes("old") ? num : parseInt(number);
    }
    return num;
}

const monkeys = [];

let monkey = {};
let productOfDivs = 1;

input.split('\n').forEach(line => {
    if(line.startsWith("Monkey ")) monkey.number = parseInt(line.split(" ")[1][0]);
    if(line.startsWith("  Starting items: ")) monkey.items = line.split(": ")[1].split(', ').slice().map(x => parseInt(x));
    if(line.startsWith("  Operation: ")) monkey.operation = line.split(": ")[1];
    if(line.startsWith("  Test: ")) {
        monkey.divisibleBy = parseInt(line.split(" divisible by ")[1]);
        productOfDivs *= parseInt(line.split(" divisible by ")[1]);
    }
    if(line.startsWith("    If true: ")) monkey.ifTrue = parseInt(line.split(" throw to monkey ")[1]);
    if(line.startsWith("    If false: ")) {
        monkey.ifFalse = parseInt(line.split(" throw to monkey ")[1]);
        monkey.itemsInspected = 0;
        monkeys.push(monkey);
        monkey = {};
    }
});

for(let i = 0; i < 10000; i++) {
    monkeys.forEach(m => {
        while(m.items.length > 0) {
            m.itemsInspected++;
            let worry = resolveOperation(m.items[0], m.operation);
            worry = Math.floor(worry % productOfDivs);
            m.items.splice(0, 1);
            if(worry % m.divisibleBy === 0) monkeys[m.ifTrue].items.push(worry);
            else monkeys[m.ifFalse].items.push(worry);
        }
    });
}

const findMaxArray = monkeys.map(m => m.itemsInspected).sort((a, b) => a - b);
const monkeyBusiness = findMaxArray.pop() * findMaxArray.pop();

console.log(monkeyBusiness)