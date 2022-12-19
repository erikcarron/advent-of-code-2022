let fs = require('fs')

let parseInput = input => input.split('')

let findMarker = input => {
  for (var i = 3; i < input.length; i++) {
    let values = input.slice(i - 3, i + 1)
    let uniqueValues = [...new Set(values)]

    if (values.length == uniqueValues.length) {
      return i + 1
    }
  }
}

let input = parseInput(fs.readFileSync('input.txt').toString())

let answer = findMarker(input)

console.log(`Answer: ${answer}`)