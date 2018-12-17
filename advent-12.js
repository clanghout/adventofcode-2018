let fs = require('fs');
let utils = require('./adventUtil');


// Plant: 🌹
// Pot  : 🌱

const parseInput = (inp) => {
    let rules = {};
    let initial = [];
    inp.map(line => {
        if (line.includes("=>")) {
            let rule = line.split(" => ");
            rules[rule[0]] = rule[1];
        }
        if (line.includes("initial state:")) {
            initial = line.split("initial state: ")[1].split('');
        }
    });
    return {
        rules: rules,
        state: initial
    }
};

function advent12(inp) {
    inp = parseInput(inp);
    // console.log(inp.rules);
    // console.log(inp.state);
    let minX = -1;
    let maxX = inp.state.length;
    let oldGen = inp.state;
    let newGen;

    for (let generation = 1; generation <= 50000000000; generation++) {
        newGen = [];
        if(generation % 1000000 === 0){
            console.log('done ',generation);
        }
        for (let x = minX - 1; x < maxX + 1; x++) {
            let situation = '';
            for (let rx = x - 2; rx <= x + 2; rx++) {
                // If the previous generation has no key for x
                if (Object.keys(oldGen).indexOf('' + (rx)) === -1) {
                    situation += '.';
                } else {
                    situation += oldGen[rx];
                }
            }
            if (inp.rules.hasOwnProperty(situation)) {
                newGen[x] = inp.rules[situation];
                if (x === minX) {
                    minX--;
                }
                if (x === maxX && inp.rules[situation] === '#') {
                    maxX++;
                }
            } else {
                newGen[x] = '.';
            }
            // find corresponding rule
            // if not available add '.'
            // update minX and maxX
        }
        oldGen = newGen;
    }

    // printGens(generations, minX, maxX);
    console.log(minX, maxX);
    let lastGen = newGen;
    let res = 0;
    for(let x = minX; x < maxX;x++){
        res += lastGen[x] === '#' ? x : 0;
    }
    return res;
}
//
// const printGens = (generations, minX, maxX) => {
//     generations.forEach((generation) => {
//         let res = "";
//         for (let x = minX; x < maxX; x++) {
//             if (Object.keys(generation).indexOf('' + x) === -1) {
//                 res += '-';
//             } else {
//                 res += generation[x];
//             }
//         }
//         console.log(res);
//     })
// };


function advent12_2(inp) {
    return -1;
}


let raw_input = fs.readFileSync('inputs/input-12', 'utf8');
let input = [];
if (raw_input) {
    input = raw_input.split('\n');
}


let input_test = fs.readFileSync('inputs/input-12-test', 'utf8').split('\n');
let input_test_2 = [];


console.log("part 1:");
// utils.testAdvent(input_test, 325, advent12);
utils.testAdvent(input, false, advent12);
//
// console.log("part 2:");
// utils.testAdvent(input_test_2, "fgij", advent12_2);
// utils.testAdvent(input, false, advent12_2);
