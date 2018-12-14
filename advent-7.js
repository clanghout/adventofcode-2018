let fs = require('fs');
let utils = require('./adventUtil');


function advent7(inp) {
    let instructions = inp.map((str) => str.match(/[A-Z](?=\s)/ug));
    let instructionTree = {};
    let instructionTree2 = {};
    let partsList = [];
    instructions.forEach((instruction) => {
        partsList.includes(instruction[0]) ? "" : partsList.push(instruction[0]);
        partsList.includes(instruction[1]) ? "" : partsList.push(instruction[1]);
        instructionTree.hasOwnProperty(instruction[0]) ?
            instructionTree[instruction[0]] ?
                instructionTree[instruction[0]].push(instruction[1])
                : instructionTree[instruction[0]] = [instruction[1]]
            : instructionTree[instruction[0]] = [instruction[1]]
    });
    instructions.forEach((instruction) => {
        instructionTree2.hasOwnProperty(instruction[1]) ?
            instructionTree2[instruction[1]] ?
                instructionTree2[instruction[1]].push(instruction[0])
                : instructionTree2[instruction[1]] = [instruction[0]]
            : instructionTree2[instruction[1]] = [instruction[0]]
    });
    // initial (find possible roots)
    let potentials = partsList.slice().filter((part) => !Object.keys(instructionTree).reduce((acc, curr) => acc || instructionTree[curr].includes(part), false));

    let result = "";

    while (potentials.length > 0) {
        if (!result.includes(potentials[0])) {
            // check if all the requirements are met using instructionTree2
            let potential = potentials.shift();
            if (instructionTree2.hasOwnProperty(potential)) {
                let hasAllRequired = instructionTree2[potential].reduce((acc, curr) => acc && result.includes(curr), true);

                while (!hasAllRequired && potentials.length > 0) {
                    potentials.push(potential);
                    // find new potential
                    potential = potentials.shift();
                    if (instructionTree2.hasOwnProperty(potential)) {
                        hasAllRequired = instructionTree2[potential].reduce((acc, curr) => acc && result.includes(curr), true);
                    } else {
                        break;
                    }
                }
            }

            result += potential;
            // Add new unlocked potentials
            instructionTree[potential] ? instructionTree[potential].forEach((inst) => !result.includes(inst) && potentials.push(inst)) : "";
            potentials = [...new Set(potentials)];          // Remove potential duplicates
        }
        potentials = potentials.sort();
    }

    return result;
}


function advent7_2(inp) {
    let instructions = inp.map((str) => str.match(/[A-Z](?=\s)/ug));
    let instructionTree = {};
    let instructionTree2 = {};
    let partsList = [];
    instructions.forEach((instruction) => {
        partsList.includes(instruction[0]) ? "" : partsList.push(instruction[0]);
        partsList.includes(instruction[1]) ? "" : partsList.push(instruction[1]);
        instructionTree.hasOwnProperty(instruction[0]) ?
            instructionTree[instruction[0]] ?
                instructionTree[instruction[0]].push(instruction[1])
                : instructionTree[instruction[0]] = [instruction[1]]
            : instructionTree[instruction[0]] = [instruction[1]]
    });
    instructions.forEach((instruction) => {
        instructionTree2.hasOwnProperty(instruction[1]) ?
            instructionTree2[instruction[1]] ?
                instructionTree2[instruction[1]].push(instruction[0])
                : instructionTree2[instruction[1]] = [instruction[0]]
            : instructionTree2[instruction[1]] = [instruction[0]]
    });
    // initial (find possible roots)
    let potentials = partsList.slice().filter((part) => !Object.keys(instructionTree).reduce((acc, curr) => acc || instructionTree[curr].includes(part), false));

    let result = "";
    let resCount = 0;
    const workers = partsList > 7 ? 5 : 2;
    const timeRequired = (char) => parseInt(char) + (partsList > 7 ? 60 : 0);
    let inProgress = {};

    while (potentials.length > 0 || Object.keys(inProgress).length > 0) {
        if (Object.keys(inProgress).length > 0){

        }


        // Check if any parts are finished
        // If so free up space + check for new potentials + try and start



        if (!result.includes(potentials[0])) {
            // check if all the requirements are met using instructionTree2
            let potential = potentials.shift();
            if (instructionTree2.hasOwnProperty(potential)) {
                let hasAllRequired = instructionTree2[potential].reduce((acc, curr) => acc && result.includes(curr), true);
                let loops = potentials.length;
                while (!hasAllRequired && potentials.length > 0 && loops > 0) {
                    loops--;
                    potentials.push(potential);
                    // find new potential
                    potential = potentials.shift();
                    if (instructionTree2.hasOwnProperty(potential)) {
                        hasAllRequired = instructionTree2[potential].reduce((acc, curr) => acc && result.includes(curr), true);
                    } else {
                        break
                    }
                }
            }

            result += potential;
            // Add new unlocked potentials
            instructionTree[potential] ? instructionTree[potential].forEach((inst) => !result.includes(inst) && potentials.push(inst)) : "";
            potentials = [...new Set(potentials)];          // Remove potential duplicates
        }
        potentials = potentials.sort();
    }
}


let raw_input = fs.readFileSync('inputs/input-7.txt', 'utf8');
let input = [];
if (raw_input) {
    input = raw_input.split('\n').filter((line) => line.match(/[a-zA-Z]+/));
}

let raw_input_test = fs.readFileSync('inputs/input-7-test.txt', 'utf8');
let input_test = [];
if (raw_input_test) {
    input_test = raw_input_test.split('\n').filter((line) => line.match(/[a-zA-Z]+/));
}


console.log("part 1:");
utils.testAdvent(input_test, "CABDFE", advent7);
utils.testAdvent(input, false, advent7);

console.log("part 2:");
// utils.testAdvent(input_test, "fgij", advent7_2);
// utils.testAdvent(input, false, advent7_2);
