let fs = require('fs')

let parseInput = input => {
  let lines = input.match(/^.+$/gm)
  let pattern = /^(\d+)-(\d+),(\d+)-(\d+)$/mi

  return lines.map(l => {
    let match = l.match(pattern)

    let firstElfStart = parseInt(match[1], 10)
    let firstElfEnd = parseInt(match[2], 10)
    let secondElfStart = parseInt(match[3], 10)
    let secondElfEnd = parseInt(match[4], 10)

    return {
      firstElf: {
        start: firstElfStart,
        end: firstElfEnd
      },
      secondElf: {
        start: secondElfStart,
        end: secondElfEnd
      }
    }
  })
}

let isFullyContained = (sectionOne, sectionTwo) => (sectionOne.start <= sectionTwo.start) && (sectionOne.end >= sectionTwo.end)

let findFullyContained = input => input.reduce((accumulator, currentValue) => isFullyContained(currentValue.firstElf, currentValue.secondElf) || isFullyContained(currentValue.secondElf, currentValue.firstElf) ? accumulator + 1 : accumulator, 0)

let input = parseInput(fs.readFileSync('input.txt').toString())

let answer = findFullyContained(input)

console.log(`Answer: ${answer}`)