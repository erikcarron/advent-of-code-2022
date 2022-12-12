let fs = require('fs')

let parseInput = input => {
  let lines = input.match(/^.+$/gm)

  return lines.map(l => {
    let length = l.length
    let compartmentSize = length / 2
    let compartmentOne = l.slice(0, compartmentSize).split('')
    let compartmentTwo = l.slice(compartmentSize).split('')
    return { compartmentOne: compartmentOne, compartmentTwo: compartmentTwo }
  })
}

let unique = (item, index, self) => {
  return self.indexOf(item) === index;
}

let findRepeats = input => {
  input.forEach(rucksack => {
    rucksack.repeats = rucksack.compartmentOne.filter(item => rucksack.compartmentTwo.includes(item)).filter(unique);
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
  input.forEach(rucksack => {
    rucksack.score = rucksack.repeats.reduce((accumulator, currentValue) => accumulator + getPriority(currentValue), 0)
  });
}

let input = parseInput(fs.readFileSync('input.txt').toString())
findRepeats(input)
score(input)
let answer = input.reduce((accumulator, currentValue) => accumulator + currentValue.score, 0)

console.log(`Answer: ${answer}`)