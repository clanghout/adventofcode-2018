let fs = require('fs');
let utils = require('./adventUtil');

function advent2(inp) {
    let twos = 0;
    let threes = 0;
    inp.forEach((curr) => {
        let occurs = {};
        curr.split('').forEach((ch) => occurs[ch] = occurs.hasOwnProperty(ch) ? occurs[ch] + 1 : 1);

        let hasTwo = false;
        let hasThree = false;
        Object.keys(occurs).forEach((f) => {
                if (occurs.hasOwnProperty(f)) {
                    if (occurs[f] === 2) {
                        hasTwo = true;
                    }
                    if (occurs[f] === 3) {
                        hasThree = true;
                    }
                }
            }
        );
        twos = hasTwo ? twos + 1 : twos;
        threes = hasThree ? threes + 1 : threes;
    });

    return twos * threes;
}

function advent2_2(inp) {
    let minDiff = 20;
    let res = "";

    for (let i = 0; i < inp.length; i++) {
        for (let j = i+1; j < inp.length; j++) {
            let cmp = stringDiff(inp[i],inp[j]);
            if(cmp.d < minDiff){
                minDiff = cmp.d;
                res = cmp.s;
            }
        }
    }
    return res;
}

function stringDiff(st1, st2){
    let diff = 0;
    let simChars = "";
    for(let i = 0; i < st1.length; i++){
        if(st1.charAt(i) !== st2.charAt(i)){
            diff++;
        }
        else {
            simChars = simChars + st1.charAt(i);
        }
    }
    return {
        d : diff,
        s : simChars
    };
}


let raw_input = fs.readFileSync('inputs/input-2.txt', 'utf8');
let input = [];
if (raw_input) {
    input = raw_input.split('\n');
}

let test_input = ["abcdef", "bababc", "abbcde", "abcccd", "aabcdd", "abcdee", "ababab"];
let test_input_2 = ["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"];


console.log("part 1:");
utils.testAdvent(test_input, 12, advent2);
utils.testAdvent(input, false, advent2);

console.log("part 2:");
utils.testAdvent(test_input_2, "fgij", advent2_2);
utils.testAdvent(input, false, advent2_2);
