let fs = require('fs');
let utils = require('./adventUtil');

const parseLine = (line) => {
    let matchRes = line.match(/<\s*(-?[0-9]+),\s*(-?\d+)>.*<\s*(-?[0-9]+),\s*(-?\d+)>/);
    return matchRes && {
        x:  parseInt(matchRes[1]),
        y:  parseInt(matchRes[2]),
        vx: parseInt(matchRes[3]),
        vy: parseInt(matchRes[4])
    }
};

function getPositions(lines, time) {
    return lines.slice().map((line) => {
        return {x: (line.x + (line.vx * time)), y: line.y + (line.vy * time)}
    });
}


function advent10(inp) {
    let lines = inp.map(parseLine).filter((line) => line !== null);
    let time = 0;
    let draws = 0;
    let intObj = setInterval(() => {
        // calculate positions
        let positions = getPositions(lines,time);
        // find out min and max positions

        let dimensions = utils.findBounds(positions);
        while(dimensions.maxX>200 && draws < 2){
            positions = getPositions(lines,time);
            dimensions = utils.findBounds(positions);
            time++;
            console.log(time);
        }
        console.log(dimensions);
        console.log(`time waited is ${time}`);

        // draw new configuration
        for (let h = dimensions.minY - 3; h <= dimensions.maxY + 1; h++) {

            let starLine = '';
            for (let w = dimensions.minX - 3; w <= dimensions.maxX + 1; w++) {
                starLine += positions.filter((coord) => coord.x === w && coord.y === h).length>0 ? '#' : '.️';
            }
            console.log(starLine)
        }

        if(draws > 3000){
            clearInterval(intObj);
        }
        draws++;
        time++;
    }, 500)
}

function advent10_2(inp) {
    return -1;
}


let raw_input = fs.readFileSync('inputs/input-10.txt', 'utf8');
let input = [];
if (raw_input) {
    input = raw_input.split('\n');
}

let raw_input_test = fs.readFileSync('inputs/input-10-test.txt', 'utf8');
let input_test = [];
if (raw_input_test) {
    input_test = raw_input_test.split('\n');
}


let input_test_2 = [];


console.log("part 1:");
// utils.testAdvent(input_test, 12, advent10);
utils.testAdvent(input, false, advent10);
//
// console.log("part 2:");
// utils.testAdvent(test_input_2, "fgij", advent10_2);
// utils.testAdvent(input, false, advent10_2);
