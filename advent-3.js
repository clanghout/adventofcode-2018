let fs = require('fs');
let utils = require('./adventUtil');


function advent3(inp) {
    let fabric = [];
    // initialize the fabric
    for (let i = 0; i < 1000; i++) {
        fabric[i] = [];
    }

    return inp.reduce((acc, claim) => {
        if (!claim.includes('#')) {
            return acc;
        }
        let claimRes = parseElfClaim(claim);
        let cutResult = cutFabric(fabric, claimRes.startX, claimRes.startY, claimRes.width, claimRes.height);
        fabric = cutResult.fabric;
        return acc + cutResult.res;
    }, 0);
}

// returns n for amount of squares that have been cut twice by this cut.
function cutFabric(fabric, startX, startY, width, height) {
    let res = 0;
    let potential = true;
    for (let x = startX; x < startX + width; x++) {
        for (let y = startY; y < startY + height; y++) {
            if (fabric[x][y]) {
                potential = false;
                fabric[x][y]++;
                if (fabric[x][y] === 2) {
                    res++;
                }
            } else {
                fabric[x][y] = 1;
            }
        }
    }

    return {
        fabric: fabric,
        res: res,
        potential: potential
    };
}

function parseElfClaim(claim) {
    // claim is formatted like "#1 @ 1,3: 4x4" as "#id @startX,startY: widthxheight"
    if (claim.includes('#') && claim.includes('@')) {
        let working = claim.split('#')[1];
        working = working.split('@');
        let id = parseInt(working[0]);
        working = working[1].split(',');
        let startX = parseInt(working[0]);
        working = working[1].split(':');
        let startY = parseInt(working[0]);
        working = working[1].split('x');
        let width = parseInt(working[0]);
        let height = parseInt(working[1]);

        return {
            id: id,
            startX: startX,
            startY: startY,
            width: width,
            height: height
        }
    } else {
        console.log(`Claim ${claim} is formatted incorrectly`);
        return undefined;
    }
}


function advent3_2(inp) {
    let fabric = [];
    // initialize the fabric
    for (let i = 0; i < 1000; i++) {
        fabric[i] = [];
    }

    let potentialCuts = [];

    inp.forEach((claim) => {
        if (claim.includes('#')) {
            let claimRes = parseElfClaim(claim);
            let cutResult = cutFabric(fabric, claimRes.startX, claimRes.startY, claimRes.width, claimRes.height);
            fabric = cutResult.fabric;
            if(cutResult.potential){
                potentialCuts.push(claimRes);
            }
        }
    });

    for(let i = 0; i<potentialCuts.length;i++){
        let cut = potentialCuts[i];
        if(checkPotentialCut(fabric, cut.startX, cut.startY, cut.width, cut.height)){
            return cut.id;
        }
    }

    console.log("no valid cuts found");
    return -1;
}

function checkPotentialCut(fabric, startX, startY, width, height){
    for (let x = startX; x < startX + width; x++) {
        for (let y = startY; y < startY + height; y++) {
            if(fabric[x][y] > 1){
                return false;
            }
        }
    }
    return true;
}


let raw_input = fs.readFileSync('inputs/input-3.txt', 'utf8');
let input = [];

if (raw_input) {
    input = raw_input.split('\n');
}


let test_input = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];


console.log("part 1:");
utils.testAdvent(test_input, 4, advent3);
utils.testAdvent(input, false, advent3);
//
console.log("part 2:");
utils.testAdvent(test_input, 3, advent3_2);
utils.testAdvent(input, false, advent3_2);
