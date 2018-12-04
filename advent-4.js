let fs = require('fs');
let utils = require('./adventUtil');

function readRecord(record) {
    let res;
    let id = record.match(/[#](\d+)/); // Find id in line
    if (id) {
        id = id[1];// Set ID to match of (...)
        res = {
            type: "id",
            id: id
        }
    } else {
        // If no ID found
        let sleepStart = record.match(/:(\d+)[\]].f/); // Find minutes when sleep starts
        if (sleepStart) {
            sleepStart = sleepStart[1];// Set sleepStart to match of (...)
            res = {
                type: "sleepStart",
                sleepStart: sleepStart,
            };
        } else {
            let sleepEnd = record.match(/:(\d+)[\]].w/); // Find minutes when sleep starts
            if (sleepEnd) {
                sleepEnd = sleepEnd[1];// Set sleepStart to match of (...)
                res = {
                    type: "sleepEnd",
                    sleepEnd: sleepEnd,
                };
            }
        }
    }
    return res;
}

function findMaxSleeper(sleepSchedule) {
    let maxMins = 0;
    let maxSleeper;
    for (let id in sleepSchedule) {
        if (sleepSchedule.hasOwnProperty(id)) {
            if (sleepSchedule[id].totalSleep > maxMins) {
                maxMins = sleepSchedule[id].totalSleep;
                maxSleeper = sleepSchedule[id];
            }
        }
    }
    return maxSleeper;
}


function findSleepMin(maxSleeper) {
    let bestMin = 0;
    let bestMinCount = 0;

    if (maxSleeper.hasOwnProperty('sleepMinutes')) {
        for (let min in maxSleeper.sleepMinutes) {
           if (maxSleeper.sleepMinutes[min] > bestMinCount) {
                bestMinCount = maxSleeper.sleepMinutes[min];
                bestMin = parseInt(min);
            }

        }
    }
    return [bestMin,bestMinCount];
}

function findSleepSchedule(inp) {
    let sleepSchedule = {};
    let lastRecord = {type: "none"};
    let lastId = -1;
    let sleepStart = -1;


    for (let i = 0; i < inp.length; i++) {
        let record = readRecord(inp[i]);
        if (record) {
            // Check if the record contains an ID we need to save
            if (record.type === "id" && (lastRecord.type === "sleepEnd" || lastRecord.type === "none" || lastRecord.type === "id")) {
                lastId = record.id;
            }
            // Check if the record is the start of a sleep period of the last id we have seen
            else if ((lastRecord.type === "id" || lastRecord.type === "sleepEnd") && record.type === "sleepStart") {
                sleepStart = record.sleepStart;

            }

            // Check if the record is the end of a sleep period of the last id we have seen
            else if (lastRecord.type === "sleepStart" && record.type === "sleepEnd") {
                if (!sleepSchedule.hasOwnProperty(lastId) && sleepStart !== -1) {
                    sleepSchedule[lastId] = {
                        id: lastId,
                        totalSleep: 0,
                        sleepMinutes: {}
                    }
                }
                // log the sleep in the schedule
                for (let j = sleepStart; j < record.sleepEnd; j++) {
                    sleepSchedule[lastId].totalSleep++;
                    if (sleepSchedule[lastId].sleepMinutes[j]) {
                        sleepSchedule[lastId].sleepMinutes[j]++;
                    } else {
                        sleepSchedule[lastId].sleepMinutes[j] = 1;
                    }
                }
            } else {
                throw `Invalid sorting, record ${record}, input: ${inp[i]}, prev: ${inp[i-1]}`;
            }

            lastRecord = record;
        } else {
            // console.log(`Invalid record ${inp[i]} at index ${i}`);
        }
    }
    return sleepSchedule;

}

function advent4(inp) {
    inp.sort();
    let sleepSchedule = findSleepSchedule(inp);

    let maxSleeper = findMaxSleeper(sleepSchedule);
    let maxSleepMin = findSleepMin(maxSleeper)[0];

    return parseInt(maxSleeper.id) * maxSleepMin;
}

function advent4_2(inp) {
    inp.sort();
    let sleepSchedule = findSleepSchedule(inp);


    let maxSleep = 0;
    let maxSleepMin = 0;
    let maxSleeper = {id: -1};
    for (let sleeper in sleepSchedule) {
        if (sleepSchedule.hasOwnProperty(sleeper)) {
            let sleepMinFound = findSleepMin(sleepSchedule[sleeper]);
            if (sleepMinFound[1] > maxSleep) {
                maxSleep = sleepMinFound[1];
                maxSleepMin = sleepMinFound[0];
                maxSleeper = sleepSchedule[sleeper];
            }
        }
    }
    return maxSleepMin * parseInt(maxSleeper.id);
}


let raw_input = fs.readFileSync('inputs/input-4.txt', 'utf8');
let input = [];
if (raw_input) {
    input = raw_input.split('\n');
}

let raw_input_test = fs.readFileSync('inputs/input-4-test.txt', 'utf8');
let test_input = [];
if (raw_input_test) {
    test_input = raw_input_test.split('\n');
}


console.log("part 1:");
utils.testAdvent(test_input, 240, advent4);
utils.testAdvent(input, false, advent4);
//
console.log("part 2:");
utils.testAdvent(test_input, 4455, advent4_2);
utils.testAdvent(input, false, advent4_2);
