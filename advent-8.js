let fs = require('fs');
let utils = require('./adventUtil');


function advent8(inp) {
    let tree = {};
    let maxNode = 0;
    let nodeParseStack = [];
    nodeParseStack.push(String.fromCharCode(maxNode));
    tree[String.fromCharCode(maxNode)] =
        {
            children: [],
            childToProcess: inp[0],
            metaToProcess: inp[1],
            metadata: []
        };

    for (let i = 2; i < inp.length; i++) {
        // console.log("remaining parsing stack: ",nodeParseStack);
        if (nodeParseStack.length == 0) {
            console.log(`Error, nothing to parse, currently on index ${i} of ${inp.length} with tree:`, tree)
        }
        let curNode = nodeParseStack.pop();

        let node = tree[curNode];

        if (node.childToProcess > 0) {
            node.childToProcess--;
            nodeParseStack.push(curNode);
            maxNode++;
            curNode = String.fromCharCode(maxNode);
            nodeParseStack.push(curNode);
            tree[curNode] =
                {
                    children: [],
                    childToProcess: inp[i],
                    metaToProcess: inp[i + 1],
                    metadata: []
                };

            node.children.push(curNode);
            i += 1;
        } else if (node.metaToProcess > 0) {
            node.metadata.push(inp[i]);
            node.metaToProcess--;
            while (node.metaToProcess > 0) {
                i++;
                node.metadata.push(inp[i]);
                node.metaToProcess--;
            }
        }
        // console.log("tree after round: ", tree);
    }

    console.log(tree);

    return Object.keys(tree).reduce((acc, node) => acc += tree[node].metadata.reduce((nacc, curr) => nacc + curr, 0), 0);
}

function getMetaRefVals(curNode, tree) {
    let res = 0;
    if (curNode.children.length > 0) {
        res = curNode.metadata.reduce((acc, meta) => {
            if (curNode.children.hasOwnProperty(meta-1)) {
                if (tree[curNode.children[meta-1]].children.length > 0){
                    console.log('recursive call to node ',curNode.children[meta-1]);
                    return acc + getMetaRefVals(tree[curNode.children[meta-1]],tree)
                } else{
                    console.log("calculating meta value");
                    return acc + tree[curNode.children[meta-1]].metadata.reduce((nacc, curr) => nacc + curr, 0);
                }
            }
            return acc;
        }, 0);
    } else {
        res = curNode.metadata.reduce((nacc, curr) => nacc + curr, 0)
    }

    console.log(`calculating value for ${curNode}, with ${curNode.children.length} children, so value ${res}`)
    return res;
}

function advent8_2(inp) {
    let tree = {};
    let maxNode = 0;
    let nodeParseStack = [];
    nodeParseStack.push(maxNode);
    tree[maxNode] =
        {
            children: [],
            childToProcess: inp[0],
            metaToProcess: inp[1],
            metadata: []
        };

    for (let i = 2; i < inp.length; i++) {
        // console.log("remaining parsing stack: ",nodeParseStack);
        if (nodeParseStack.length == 0) {
            console.log(`Error, nothing to parse, currently on index ${i} of ${inp.length} with tree:`, tree)
        }
        let curNode = nodeParseStack.pop();

        let node = tree[curNode];

        if (node.childToProcess > 0) {
            node.childToProcess--;
            nodeParseStack.push(curNode);
            maxNode++;
            curNode = maxNode;
            nodeParseStack.push(curNode);
            tree[curNode] =
                {
                    children: [],
                    childToProcess: inp[i],
                    metaToProcess: inp[i + 1],
                    metadata: []
                };

            node.children.push(curNode);
            i += 1;
        } else if (node.metaToProcess > 0) {
            node.metadata.push(inp[i]);
            node.metaToProcess--;
            while (node.metaToProcess > 0) {
                i++;
                node.metadata.push(inp[i]);
                node.metaToProcess--;
            }
        }
        // console.log("tree after round: ", tree);
    }

    // console.log(tree);

    return getMetaRefVals(tree[0],tree);
}


let raw_input = fs.readFileSync('inputs/input-8.txt', 'utf8');
let input = [];
if (raw_input) {
    input = raw_input.split('\n').filter((line) => line.match(/\d+/)).map((num) => parseInt(num));
}

let input_test = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
let input_test_2 = [];


console.log("part 1:");
// utils.testAdvent(input_test, 138, advent8);
// utils.testAdvent(input, false, advent8);
//
console.log("part 2:");
utils.testAdvent(input_test, 66, advent8_2);
utils.testAdvent(input, false, advent8_2);
