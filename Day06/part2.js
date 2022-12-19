let fs = require('fs')

let parseInput = input => input.split('')

let findMarker = (input, uniqueCount) => {
  for (var i = uniqueCount - 1; i < input.length; i++) {
    let values = input.slice(i - uniqueCount + 1, i + 1)
    let uniqueValues = [...new Set(values)]

    if (values.length == uniqueValues.length) {
      return i + 1
    }
  }
}

let input = parseInput(fs.readFileSync('input.txt').toString())

let answer = findMarker(input, 14)

console.log(`Answer: ${answer}`)