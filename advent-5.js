let fs = require('fs');
let utils = require('./adventUtil');

function isUpper(st) {
    return st === st.toUpperCase();
}

const canDestroy = (ch1,ch2) => ch1 !== ch2 && ch1.toUpperCase() === ch2.toUpperCase();

// returns string after one destruction
function searchAndDestroy(chain, index) {
    if (index >= chain.length) {
        return {
            chain: chain.join(''),
            index: index
        }
    }

    for (let i = index; i < chain.length; i++) {
        if (chain[i]) {
            if (canDestroy(chain[i - 1], chain[i])) {
                chain.splice(i - 1, 2);
                return {
                    chain: chain.join(''),
                    index: i - 1
                }
            }
        }
    }
    return {
        chain: chain.join(''),
        index: chain.length
    }
}


// Input is the full string
function advent5(inp) {
    let chain = inp.split('').filter((el) => el.length === 1 && el.match(/[a-zA-Z]/i));
    let index = 1;
    let res;
    while (index < chain.length) {
        res = searchAndDestroy(chain, index);
        chain = res.chain.split('');
        index = Math.max(res.index, 1);
    }
    return chain.length;
}

function advent5_2(inp) {
    let chain = inp.split('').filter((el) => el.length === 1 && el.match(/[a-zA-Z]/i));
    let res;
    let minLength = 99999;
    for (let c = 65; c <= 90; c++) {
        let charFilter = String.fromCharCode(c);
        if (chain.includes(charFilter || charFilter.toLowerCase())) {
            let tempChain = chain.slice();
            tempChain = tempChain.filter((ch) => ch != charFilter && ch != charFilter.toLowerCase());
            // console.log(`filtering ${charFilter} working with temp chain chain`, tempChain.join(''));

            let index = 1;
            while (index < tempChain.length) {
                res = searchAndDestroy(tempChain, index);
                tempChain = res.chain.split('');
                index = Math.max(res.index, 1);
            }
            // console.log(`potential`, tempChain.join(''));

            if (tempChain.length < minLength) {
                // console.log(`found new shortest chain`, tempChain.join(''));
                minLength = tempChain.length;
            }
        }
    }
    return minLength;
}


let input = fs.readFileSync('inputs/input-5.txt', 'utf8');


console.log("part 1:");
utils.testAdvent("aA", 0, advent5);
utils.testAdvent("AA", 2, advent5);
utils.testAdvent("aa", 2, advent5);
utils.testAdvent("Aa", 0, advent5);
utils.testAdvent("lsSkadjJewrlkfjkvjfdsadAaV", "lsSkadjJewrlkfjkvjfdsadAaV".length - 6, advent5);
utils.testAdvent("abBA", 0, advent5);
utils.testAdvent("cabBAC", 0, advent5);
utils.testAdvent("dDdabBAD", 0, advent5);
utils.testAdvent("LVcabBACvdDl", 0, advent5);
utils.testAdvent("aabAAB", 6, advent5);
utils.testAdvent("dabAcCaCBAcCcaDA", 10, advent5);

utils.testAdvent(input, false, advent5);

console.log("part 2:");
utils.testAdvent("dabAcCaCBAcCcaDA", 4, advent5_2);
utils.testAdvent(input, false, advent5_2);
