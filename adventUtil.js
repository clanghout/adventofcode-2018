// from https://ines.io/blog/custom-console-logging-emoji
// Define your custom commands and emoji
const commands = [
    {emoji: '🦄', name: 'unicorn'},
    {emoji: '🍕', name: 'pizza'},
    {emoji: '🍺', name: 'beer'},
    {emoji: '💩', name: 'poo'},
    {emoji: '✅', name: 'check'}
];

// Create custom commands
commands.forEach(({name, emoji}) => console[name] = (...args) => console.log(emoji + ' ' + args.join(', ')));

// Test method. Provide input, expected value and the function to log results.
// Use false as expected value to only show outcome. (for answers of the actual inputs)
function testAdvent(input, expected, funct) {
    let result = funct(input);
    if (expected === false) {
        console.check(`Answer for advent input is ${result}`);
        return true;
    }
    if (result === expected) {
        console.check(`Input gives expected result ${expected}`);
        return true;
    }
    console.poo(`Error: Input ${input} returned ${result} but ${expected} was expected`);
    return false;
}

module.exports = {
    'testAdvent' : testAdvent
}
