let fs = require('fs');
let utils = require('./adventUtil');

const parseCoord = (coordString) => {
    const coords = coordString.match(/[0-9]+/ug);// match all
    if (coords) {
        return {
            x: parseInt(coords[0]),
            y: parseInt(coords[1])
        }
    }
};

const getDistance = (c1, c2) => Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y);



function advent6(inp) {
    const coordList = inp.map(parseCoord);
    let parsedVals = utils.findBounds(coordList);

    let closestLog = coordList.slice().map((coord) => {
        coord.closeCount = 0;
        coord.hasEdge = false;
        return coord;
    });

    for (let h = parsedVals.minY - 1; h <= parsedVals.maxY + 1; h++) {
        for (let w = parsedVals.minX - 1; w <= parsedVals.maxX + 1; w++) {
            let minDist = 1000;
            let double = false;
            let closest = {};
            closestLog.forEach((curr) => {
                let dist = getDistance(curr, {x: w, y: h});
                if (dist === minDist) {
                    double = true;
                }
                if (dist < minDist) {
                    minDist = dist;
                    closest = curr;
                    double = false;
                }
            });
            if (!double)
                closest.closeCount++;
            if (h <= parsedVals.minY || h >= parsedVals.maxY || w <= parsedVals.minX || w >= parsedVals.maxX) {
                closest.hasEdge = true;
            }
        }
    }

    return closestLog.reduce((acc, curr) => (!curr.hasEdge && curr.closeCount > acc) ? curr.closeCount : acc, 0);
}

function advent6_2(inp) {
    const coordList = inp.map(parseCoord);
    let parsedVals = utils.findBounds(coordList);

    let safeAreaSize = 0;

    for (let h = parsedVals.minY - 1; h <= parsedVals.maxY + 1; h++) {
        for (let w = parsedVals.minX - 1; w <= parsedVals.maxX + 1; w++) {
            let minDist = inp.length > 10 ? 10000 : 32;
            let totalDist = coordList.reduce((acc, curr) => acc + getDistance(curr, {x: w, y: h}), 0);
            if (totalDist < minDist) {
                safeAreaSize++;
            }
        }
    }
    return safeAreaSize;
}


// Input parsing and tests

let raw_input = fs.readFileSync('inputs/input-6.txt', 'utf8');
let input = [];
if (raw_input) {
    input = raw_input.split('\n').filter((coord) => coord.match(/[0-9]+, [0-9]+/));
}

let raw_input_test = fs.readFileSync('inputs/input-6-test.txt', 'utf8');
let input_test = [];
if (raw_input_test) {
    input_test = raw_input_test.split('\n').filter((coord) => coord.match(/[0-9]+, [0-9]+/));
}


console.log("part 1:");
utils.testAdvent(input_test, 17, advent6);
utils.testAdvent(input, false, advent6);

console.log("part 2:");
utils.testAdvent(input_test, 16, advent6_2);
utils.testAdvent(input, false, advent6_2);
