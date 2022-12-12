let fs = require('fs')

let parseInput = input => {
    let lines = input.match(/^.+$/gm)
    let groupLength = lines.length / 3
    let groups = new Array(groupLength)

    for (let i = 0; i < groupLength; i++) {
        groups[i] = {}
        groups[i].rucksackOne = lines[i * 3 + 0].split('')
        groups[i].rucksackTwo = lines[i * 3 + 1].split('')
        groups[i].rucksackThree = lines[i * 3 + 2].split('')
    }

    return groups
}

let unique = (item, index, self) => {
    return self.indexOf(item) === index;
}

let findRepeats = input => {
    input.forEach(group => {
        group.repeats = group.rucksackOne.filter(item => group.rucksackTwo.includes(item) && group.rucksackThree.includes(item)).filter(unique);
    });
}

let getPriority = item => {
    if (item.charCodeAt(0) <= 90) {
        return item.charCodeAt(0) - 38
    } {
        return item.charCodeAt(0) - 96
    }
}

let score = input => {
    input.forEach(group => {
        group.score = group.repeats.reduce((accumulator, currentValue) => accumulator + getPriority(currentValue), 0)
    });
}

let input = parseInput(fs.readFileSync('input.txt').toString())

findRepeats(input)
score(input)

let answer = input.reduce((accumulator, currentValue) => accumulator + currentValue.score, 0)

console.log(`Answer: ${answer}`)