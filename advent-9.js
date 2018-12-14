let fs = require('fs');
let utils = require('./adventUtil');


function advent#N#(inp){
    return -1;
}

function advent#N#_2(inp){
    return -1;
}


let raw_input = fs.readFileSync('inputs/input-#N#.txt', 'utf8');
let input = [];
if (raw_input) {
    input = raw_input.split('\n');
}


let input_test = [];
let input_test_2 = [];


console.log("part 1:");
utils.testAdvent(test_input, 12, advent#N#);
utils.testAdvent(input, false, advent#N#);

console.log("part 2:");
utils.testAdvent(test_input_2, "fgij", advent#N#_2);
utils.testAdvent(input, false, advent#N#_2);
