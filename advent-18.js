let fs = require('fs');
let utils = require('./adventUtil');


function advent18(inp) {
    inp.map(line => line.split(''));
    let current = inp;
    let newMap = [];
    for (let m = 0; m < 10; m++){
        newMap = [];
    for (let y = 0; y < inp.length; y++) {
        newMap[y] = [];
        for (let x = 0; x < inp[0].length; x++) {
            // For every input cell
            let surrounding = {
                tree: 0,
                lumberyard: 0,
                open: 0
            };
            for (let i = x - 1; i <= x + 1; i++) {
                for (let j = y - 1; j <= y + 1; j++) {
                    // 3x3 area
                    // console.log(`${i},${j} : ${i >= 0} && ${i < inp[0].length} && ${j >= 0} && ${j < inp.length} && ${!(i === x && j === y)}`);
                    if (i >= 0 && i < inp[0].length && j >= 0 && j < inp.length && !(i === x && j === y)) {
                        // save
                        if (current[j][i] === '.') {
                            surrounding.open++;
                        }
                        if (current[j][i] === '|') {
                            surrounding.tree++;
                        }
                        if (current[j][i] === '#') {
                            surrounding.lumberyard++;
                        }
                    }
                }
            }
            //
            if (current[y][x] === '.') {
                newMap[y][x] = surrounding.tree >= 3 ? '|' : '.';
            }
            if (current[y][x] === '|') {
                newMap[y][x] = surrounding.lumberyard >= 3 ? '#' : '|';
            }
            if (current[y][x] === '#') {
                newMap[y][x] = surrounding.lumberyard>0 && surrounding.tree>0 ? '#' : '.';
            }

        }
    }
    current = newMap;
    }
    // console.log(newMap);
    let lumberAmount = newMap.reduce((acc, line) => acc + line.reduce((lacc,space) => lacc + (space === '#' ? 1 : 0 ),0),0);
    let treeAmount = newMap.reduce((acc, line) => acc + line.reduce((lacc,space) => lacc + (space === '|' ? 1 : 0 ),0),0);

    return lumberAmount*treeAmount;
}


// between 183040 and 184000
function advent18_2(inp) {
    let sequenceStart = 12788;
    let sequence = [];
    inp.map(line => line.split(''));
    let current = inp;
    let newMap = [];
    let lumberAmount = 0;
    let treeAmount = 0;
    for (let m = 0; m < sequenceStart+30; m++){
        newMap = [];
        for (let y = 0; y < inp.length; y++) {
            newMap[y] = [];
            for (let x = 0; x < inp[0].length; x++) {
                // For every input cell
                let surrounding = {
                    tree: 0,
                    lumberyard: 0,
                    open: 0
                };
                for (let i = x - 1; i <= x + 1; i++) {
                    for (let j = y - 1; j <= y + 1; j++) {
                        // 3x3 area
                        if (i >= 0 && i < inp[0].length && j >= 0 && j < inp.length && !(i === x && j === y)) {
                            // save
                            if (current[j][i] === '.') {
                                surrounding.open++;
                            }
                            if (current[j][i] === '|') {
                                surrounding.tree++;
                            }
                            if (current[j][i] === '#') {
                                surrounding.lumberyard++;
                            }
                        }
                    }
                }
                //
                if (current[y][x] === '.') {
                    newMap[y][x] = surrounding.tree >= 3 ? '|' : '.';
                }
                if (current[y][x] === '|') {
                    newMap[y][x] = surrounding.lumberyard >= 3 ? '#' : '|';
                }
                if (current[y][x] === '#') {
                    newMap[y][x] = surrounding.lumberyard>0 && surrounding.tree>0 ? '#' : '.';
                }

            }
        }
        current = newMap;
        let oldLumber = lumberAmount;
        let oldTree = treeAmount;
        lumberAmount = newMap.reduce((acc, line) => acc + line.reduce((lacc,space) => lacc + (space === '#' ? 1 : 0 ),0),0);
        treeAmount = newMap.reduce((acc, line) => acc + line.reduce((lacc,space) => lacc + (space === '|' ? 1 : 0 ),0),0);

        // console.log(`Minute ${m}, Lumbercamps: ${lumberAmount}, Trees: ${treeAmount}, differenceLumber: ${oldLumber-lumberAmount},   \tdifferenceTree: ${oldTree-treeAmount}`)
        // period of 28
        if(m>=sequenceStart && m<=sequenceStart+(28)+1){
            sequence[m-sequenceStart] = lumberAmount*treeAmount;
        }
        if(m===9){
            console.log('part 1 was: ', lumberAmount*treeAmount)
        }
    }

    console.log(sequence);
    return sequence[(1000000000-sequenceStart-1)%28];

}


let input = fs.readFileSync('inputs/input-18', 'utf8').split('\n');

let input_test = fs.readFileSync('inputs/input-18-test', 'utf8').split('\n');

console.log("part 1:");
utils.testAdvent(input_test, 1147, advent18);
utils.testAdvent(input, false, advent18);
//
console.log("part 2:");
utils.testAdvent(input, false, advent18_2);
