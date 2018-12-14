function createPowerGrid(inp) {
    let powerGrid = [];
    for (let x = 1; x <= 300; x++) {
        powerGrid[x] = [];
        for (let y = 1; y <= 300; y++) {
            let id = x + 10;
            let powerlevel = id * y;
            powerlevel += inp;
            powerlevel *= id;
            powerGrid[x][y] = Math.floor((powerlevel % 1000) / 100) - 5;
        }
    }
    return powerGrid;
}

function advent11(inp) {
    // ID => X + 10
    // Power level => Math.floor((Y + inp) * ID % 1000 \ 100) - 5
    let PG = createPowerGrid(inp);


    let maxCoord = {x: 0, y: 0, score: 0};
    for (let i = 1; i <= (300 - 3); i++) {
        for (let j = 1; j <= (300 - 3); j++) {
            let score = 0;
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    score += PG[i + x][j + y];
                }
            }
            maxCoord = score > maxCoord.score ? {x: i, y: j, score: score} : maxCoord;
        }
    }


    return maxCoord;
}

function advent11_2(inp) {
    let PG = createPowerGrid(inp);


    let maxCoord = {x: 0, y: 0, score: 0};
    for (let i = 1; i <= (300 - 3); i++) {
        if (i % 3 == 0)
            console.log(`${i / 3}%`);
        for (let j = 1; j <= (300 - 3); j++) {
            for (let size = 4; size <= 300 - i; size++) {
                let score = 0;
                for (let x = 0; x < size; x++) {
                    for (let y = 0; y < size; y++) {
                        score += PG[i + x][j + y];
                    }
                }
                maxCoord = score > maxCoord.score ? {x: i, y: j, score: score, size: size} : maxCoord;
            }

        }
    }


    return maxCoord;
}

console.log("createPowerGrid tests:");
console.log(`Test: cell 3,5 of grid 8 should be 4 and is:`, createPowerGrid(8)[3][5]);
console.log(`Test: cell 122,79 of grid 57 should be -5 and is:`, createPowerGrid(57)[122][79]);
console.log(`Test: cell 217,196 of grid 39 should be 0 and is:`, createPowerGrid(39)[217][196]);
console.log(`Test: cell 101,153 of grid 71 should be 4 and is:`, createPowerGrid(71)[101][153]);
console.log("\npart 1:");
console.log(advent11(18));
console.log(advent11(42));
console.log("Result for part 1 is:", advent11(7403));

console.log("\npart 2:");
console.log("Result for part 2 is:", advent11_2(7403));
