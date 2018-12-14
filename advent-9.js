// Run with 'node --max-old-space-size=8192 advent-9.js' to prevent out of memory exception.
// sidenote: prepare for node to crash afterwards
let fs = require('fs');
let utils = require('./adventUtil');
let DLL = require('./doubly-linked-list');

const circPrev = (node, list) => node.prev ? node.prev : list.tail();
const circNext = (node, list) => node.next ? node.next : list.head();

function advent9(inp){
    let gameState = new DLL.DoublyLinkedList();
    let currentMarble = gameState.append(0);
    currentMarble = currentMarble.append(1);
    let scores = {};

    for(let i = 2; i < inp.last;i++){
        // i is current marble
        let currentPlayer = i % inp.players;
        // special turn
        if (i%23===0) {
            scores[currentPlayer] ?
                scores[currentPlayer].push(i) :
                scores[currentPlayer] = [i];
            for(let k = 0;k<6;k++){
                currentMarble = circPrev(currentMarble,gameState);
            }
            let removed = circPrev(currentMarble,gameState);
            scores[currentPlayer].push(removed.data);
            removed.remove();
        } else {
            currentMarble = circNext(currentMarble,gameState).append(i);
        }

    }

    let totalScores = Object.keys(scores).map((player) => scores[player].reduce((acc,curr) => acc + curr));
    // TODO: compute max score

    return totalScores.reduce((acc,curr) => curr > acc ? curr : acc,0);
}

function advent9_2(inp){
    inp.last *= 100;
    return advent9(inp);
}


console.log("part 1:");
utils.testAdvent({players: 9, last: 25}, 32, advent9);
utils.testAdvent({players: 10, last: 1618}, 8317, advent9);
utils.testAdvent({players: 13, last: 7999}, 146373, advent9);
utils.testAdvent({players: 17, last: 1104}, 2764, advent9);
utils.testAdvent({players: 21, last: 6111}, 54718, advent9);
utils.testAdvent({players: 30, last: 5807}, 37305, advent9);
utils.testAdvent({players: 429, last: 70901}, false, advent9);

console.log("part 2:");
utils.testAdvent({players: 429, last: 70901}, false,advent9_2);
