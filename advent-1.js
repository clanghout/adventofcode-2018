let fs = require('fs');
let utils = require('./adventUtil');

// Solution for part 1 of day 1
function advent1(inp) {
    return inp.splice(0).reduce((acc, curr) => {
        if (!curr) {
            return acc;
        }
        let currV;
        currV = parseInt(curr);
        let inter = acc;
        if (typeof currV === 'number') {
            inter = acc + currV;
        } else {
            console.log("error with input", curr);
            return -9999;
        }
        if (isNaN(inter)) {
            console.log(`error with acc ${acc}, curr ${curr}, currV ${currV}`)
            return 0;
        }
        return inter;


    }, 0); // add default value
}

// Day 1 part 2
function advent1_2(inp, acc, occurredFreqs) { // input, current accumulator, frequencies that have occurred before.
    // set default parameters for first run
    if (!acc) {
        acc = 0;
    }
    if (!occurredFreqs) {
        occurredFreqs = {'0': 1};
    }


    for (let curr of inp) {
        if (!curr) {
            break;
            // If newline is present at end of file :(
        }

        let currV; // Split input value from parsed value.
        currV = parseInt(curr);
        if (typeof currV === 'number') {
            acc += currV;
            // Check if the frequency already occurred
            if (!occurredFreqs.hasOwnProperty(acc)) {
                occurredFreqs[acc] = 1;
            } else {
                // We found an answer!!!
                return acc;
            }
        } else {
            // invalid input detected
            console.log("error with input", curr);
            break;
        }

    }

    // Restart the sequence, now with the current frequency as starting point, and the occurred frequencies to track the answer.
    return advent1_2(inp, acc, occurredFreqs);
}


// Prepare puzzle input
let raw_input = fs.readFileSync('inputs/input-1.txt', 'utf8');
let input = [];
if (raw_input) {
    input = raw_input.split('\n');
}

// Tests:
// utils.testAdvent(['+1', '+1', '+1'], 3, advent1);
// utils.testAdvent(['+1', '+1', '-2'], 0, advent1);
// utils.testAdvent(['-1', '-2', '-3'], -6, advent1);
// utils.testAdvent(input,false,advent1);
//
console.log("part 2:");
// utils.testAdvent(['+1', '-1'], 0, advent1_2);
// utils.testAdvent(['+3', '+3', '+4', '-2', '-4'], 10, advent1_2);
// utils.testAdvent(['-6', '+3', '+8', '+5', '-6'], 5, advent1_2);
// utils.testAdvent(['+7', '+7', '-2', '-7', '-4'], 14, advent1_2);

// Max call stack if all others are also ran within the same execution.
utils.testAdvent(input, false, advent1_2);




