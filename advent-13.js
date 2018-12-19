let fs = require('fs');
let utils = require('./adventUtil');

function parseTrainMap(inp) {
    let trains = {};
    let map = inp.map((line, i) => {
        let match = line.match(/[v^<>]/);
        while (match) {
            trains[match.index + ',' + i] = {
                x: match.index,
                y: i,
                direction: match[0],
                step: 0
            };
            if (match[0] === '^' || match[0] === 'v') {
                line = line.substr(0, match.index) + '|' + line.substr(match.index + 1);
            } else {
                line = line.substr(0, match.index) + '-' + line.substr(match.index + 1);
            }
            // redefine loop value
            match = line.match(/[v^<>]/);
        }
        return line;
    });
    return {
        trains: trains,
        map: map
    }
}

// Input:   train: train coordinates and direction
//          track: track currently on
// Output:  train object with updated coordinates and direction
// NOTE:    At cross swap direction every time
const getNextDirection = (train, track) => {
    if (train.direction === '>') {
        if (track === '-') {
            train.x += 1;
        } else if (track === '\\') {
            train.direction = 'v';
            train.y += 1;
        } else if (track === '/') {
            train.direction = '^';
            train.y -= 1;
        } else if (track === '+') {
            if (!train.state || train.state === 0) {
                train.direction = '^';
                train.y -= 1;
                train.state = train.state ? train.state + 1 : 1;
            } else if (train.state === 1) {
                train.x += 1;
                train.state++;
            } else if (train.state === 2) {
                train.direction = 'v';
                train.y += 1;
                train.state = 0;
            }
        }

    } else if (train.direction === '<') {
        if (track === '-') {
            train.x -= 1;
        } else if (track === '\\') {
            train.direction = '^';
            train.y -= 1;
        } else if (track === '/') {
            train.direction = 'v';
            train.y += 1;
        } else if (track === '+') {
            if (!train.state || train.state === 0) {
                train.direction = 'v';
                train.y += 1;
                train.state = train.state ? train.state + 1 : 1;
            } else if (train.state === 1) {
                train.x -= 1;
                train.state++;
            } else if (train.state === 2) {
                train.direction = '^';
                train.y -= 1;
                train.state = 0;
            }
        }
    } else if (train.direction === '^') {
        if (track === '|') {
            train.y -= 1;
        } else if (track === '\\') {
            train.direction = '<';
            train.x -= 1;
        } else if (track === '/') {
            train.direction = '>';
            train.x += 1;
        } else if (track === '+') {
            if (!train.state || train.state === 0) {
                train.direction = '<';
                train.x -= 1;
                train.state = train.state ? train.state + 1 : 1;
            } else if (train.state === 1) {
                train.y -= 1;
                train.state++;
            } else if (train.state === 2) {
                train.direction = '>';
                train.x += 1;
                train.state = 0;
            }
        }
    } else if (train.direction === 'v') {
        if (track === '|') {
            train.y += 1;
        } else if (track === '\\') {
            train.direction = '>';
            train.x += 1;
        } else if (track === '/') {
            train.direction = '<';
            train.x -= 1;
        } else if (track === '+') {
            if (!train.state || train.state === 0) {
                train.direction = '>';
                train.x += 1;
                train.state = train.state ? train.state + 1 : 1;
            } else if (train.state === 1) {
                train.y += 1;
                train.state++;
            } else if (train.state === 2) {
                train.direction = '<';
                train.x -= 1;
                train.state = 0;
            }
        }
    }
    train.step++;
    return train;
};

// Input:   map.trains: list of all trains
//          map.map: rail track map
// Prints the area of the map around the x,y coordinates from parameters
function showTrainArea(map, x, y) {
    let previewSize = 6 / 2;
    for (let j = Math.max(0, y - previewSize); j < Math.min(map.map.length - 1, y + previewSize); j++) {
        let line = "";
        for (let i = Math.max(0, x - previewSize); i < Math.min(x + previewSize, map.map[j].length); i++) {
            if (map.oldTrains.hasOwnProperty(i + ',' + j)) {
                line += map.oldTrains[i + ',' + j].direction === "^" ? "⬆️" :
                    map.oldTrains[i + ',' + j].direction === "v" ? "⬇️" :
                        map.oldTrains[i + ',' + j].direction === "<" ? "️⬅️ " :
                            map.oldTrains[i + ',' + j].direction === ">" ? "➡️ " : ""
                ;
            } else {
                line += map.map[j][i] === '-' ? "➖️" :
                    map.map[j][i] === '|' ? "⏸ " :
                        map.map[j][i] === '\\' ? '↖ ️' : //'⇘' :
                            map.map[j][i] === '/' ? '↙ ️' : //'⇗' :
                                map.map[j][i] === '+' ? '➕' : '⬛️';
            }
        }
        console.log(line);
    }
    console.log("collisioin situation:");
    for (let j = Math.max(0, y - previewSize); j < Math.min(map.map.length - 1, y + previewSize); j++) {
        let line = "";
        for (let i = Math.max(0, x - previewSize); i < Math.min(x + previewSize, map.map[j].length); i++) {
            if (map.trains.hasOwnProperty(i + ',' + j)) {
                line += map.trains[i + ',' + j].direction === "^" || map.trains[i + ',' + j].direction === "v" ? "🚆" : "🚋";

            } else {
                line += map.map[j][i] === '-' ? "➖️" :
                    map.map[j][i] === '|' ? "⏸ " :
                        map.map[j][i] === '\\' ? '↖ ️' : //'⇘' :
                            map.map[j][i] === '/' ? '↙ ️' : //'⇗' :
                                map.map[j][i] === '+' ? '➕' : '⬛️';
            }
        }
        console.log(line);
    }
}

// Output:  updated trainlist and map
const doTrainsStep = (map) => {
    let res = false;
    map.oldTrains = JSON.parse(JSON.stringify(map.trains));

    function singleTrainStep(trainKey) {
        let train = map.trains[trainKey];
        delete map.trains[trainKey];
        // Map is indexed as y,x
        if (!map.map[train.y][train.x].match(/[/\\\-|+]/)) {
            console.log("train went rogue", map.map[train.y][train.x]);
        }
        let newTrain = getNextDirection(train, map.map[train.y][train.x]);
        let newTrainName = newTrain.x + ',' + newTrain.y;

        // check if we were facing a train
        if ((train.direction === '^' && map.trains.hasOwnProperty(newTrainName) && map.trains[newTrainName].direction === 'v') ||
            (train.direction === 'v' && map.trains.hasOwnProperty(newTrainName) && map.trains[newTrainName].direction === '^') ||
            (train.direction === '<' && map.trains.hasOwnProperty(newTrainName) && map.trains[newTrainName].direction === '>') ||
            (train.direction === '>' && map.trains.hasOwnProperty(newTrainName) && map.trains[newTrainName].direction === '<')) {
            showTrainArea(map, newTrain.x, newTrain.y);

        }

        // check for existing objects to return collisions
        if (map.trains.hasOwnProperty(newTrainName)) {
            console.log(`Potential collision at ${newTrainName}, steps are ${newTrain.step} and existing ${map.trains[newTrainName].step}`);
            if (newTrain.step === map.trains[newTrainName].step) {
                res = newTrainName;
            } else {
                // remapping old train to temp key
                if (map.trains.hasOwnProperty("#" + newTrainName + "temp")) {
                    console.log("WUTDFAUK")
                }
                map.trains[newTrainName + "temp"] = map.trains[newTrainName];
            }
        }
        map.trains[newTrainName] = newTrain;
        return res;
    }

    Object.keys(map.trains).sort((a, b) => {
        a = map.trains[a];
        b = map.trains[b];
        return (a.y - b.y) || (a.x - b.x)
    }).forEach((trainKey) => {
        res = singleTrainStep(trainKey);
    });
    Object.keys(map.trains).sort((a, b) => {
        a = map.trains[a];
        b = map.trains[b];
        return (a.y - b.y) || (a.x - b.x)
    }).forEach((trainKey) => {
        if (trainKey.includes("temp")) {
            res = singleTrainStep(trainKey);
            console.log("remapping old ones");
        }
    });
    Object.keys(map.trains).sort((a, b) => {
        a = map.trains[a];
        b = map.trains[b];
        return (a.y - b.y) || (a.x - b.x)
    }).forEach((trainKey) => {
        if (trainKey.includes("temp")) {
            res = singleTrainStep(trainKey);
            console.log(" STILLLL remapping old ones");
        }
    });

    return res;
};


// Output:  updated trainlist and map
const doTrainsStep2 = (map) => {
    let res = false;
    if (Object.keys(map.trains).length < 2) {
        return map.trains[Object.keys(map.trains)[0]];
    }
    map.oldTrains = JSON.parse(JSON.stringify(map.trains));

    // console.log("oldtrains",map.trains)
    function singleTrainStep(trainKey) {
        if (map.trains.hasOwnProperty(trainKey)) {
            let train = map.trains[trainKey];
            delete map.trains[trainKey];
            // Map is indexed as y,x
            // console.log(train)
            if (train && map.map[train.y] && !map.map[train.y][train.x].match(/[/\\\-|+]/)) {
                console.log("train went rogue", map.map[train.y][train.x]);
            }
            let newTrain = getNextDirection(train, map.map[train.y][train.x]);
            let newTrainName = newTrain.x + ',' + newTrain.y;

            // check if we were facing a train
            if ((train.direction === '^' && map.trains.hasOwnProperty(newTrainName) && map.trains[newTrainName].direction === 'v') ||
                (train.direction === 'v' && map.trains.hasOwnProperty(newTrainName) && map.trains[newTrainName].direction === '^') ||
                (train.direction === '<' && map.trains.hasOwnProperty(newTrainName) && map.trains[newTrainName].direction === '>') ||
                (train.direction === '>' && map.trains.hasOwnProperty(newTrainName) && map.trains[newTrainName].direction === '<')) {
                // showTrainArea(map, newTrain.x, newTrain.y);

            }

            // check for existing objects to return collisions
            if (map.trains.hasOwnProperty(newTrainName)) {
                // console.log(`Potential collision at ${newTrainName}, steps are ${newTrain.step} and existing ${map.trains[newTrainName].step}`);
                delete map.trains[newTrainName];
            } else {
                map.trains[newTrainName] = newTrain;
            }
        }
        return res;
    }

    Object.keys(map.trains).sort((a, b) => {
        a = map.trains[a];
        b = map.trains[b];
        return (a.y - b.y) || (a.x - b.x)
    }).forEach((trainKey) => {
        res = singleTrainStep(trainKey);
    });
    Object.keys(map.trains).sort((a, b) => {
        a = map.trains[a];
        b = map.trains[b];
        return (a.y - b.y) || (a.x - b.x)
    }).forEach((trainKey) => {
        if (trainKey.includes("temp")) {
            res = singleTrainStep(trainKey);
            console.log("remapping old ones");
        }
    });
    Object.keys(map.trains).sort((a, b) => {
        a = map.trains[a];
        b = map.trains[b];
        return (a.y - b.y) || (a.x - b.x)
    }).forEach((trainKey) => {
        if (trainKey.includes("temp")) {
            res = singleTrainStep(trainKey);
            console.log(" STILLLL remapping old ones");
        }
    });

    return res;
};

function advent13(inp) {
    inp.map(a => a.split(''));
    let map = parseTrainMap(inp);
    let step = 0;
    let trainStep = doTrainsStep(map);
    while (!trainStep && step < 1000) {
        step++;
        trainStep = doTrainsStep(map);
    }
    return trainStep;
}

function advent13_2(inp) {
    inp.map(a => a.split(''));
    let map = parseTrainMap(inp);
    let step = 0;
    let trainStep = doTrainsStep2(map);
    while (!trainStep) {
        step++;
        trainStep = doTrainsStep2(map);
    }
    console.log(`step = ${step}, trainstep = ${trainStep}`);
    return trainStep.x + ',' + trainStep.y;
}


let raw_input = fs.readFileSync('inputs/input-13', 'utf8');
let input = [];
if (raw_input) {
    input = raw_input.split('\n');
}


let input_test = fs.readFileSync('inputs/input-13-test', 'utf8').split('\n');
let input_test_2 = fs.readFileSync('inputs/input-13-test-2', 'utf8').split('\n');


console.log("part 1:");
utils.testAdvent(input_test, "7,3", advent13);
utils.testAdvent(input, false, advent13);

console.log("part 2:");
utils.testAdvent(input_test_2, "6,4", advent13_2);
utils.testAdvent(input, false, advent13_2);
