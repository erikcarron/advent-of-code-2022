let fs = require('fs')

let parseInput = input => input.split('\r\n')

let calculateTotalCalories = input => input.reduce((accumulator, currentValue, currentIndex, array) => {
  if (currentValue === '') {
    accumulator.push(0)
  } else {
    let calories = parseInt(currentValue, 10)
    let index = accumulator.length - 1

    if (index <= 0) {
      accumulator.push(0)
      index = 0
    }
    accumulator[index] += calories
  }

  return accumulator
}, [])

let input = parseInput(fs.readFileSync('input.txt').toString())
let totalCalories = calculateTotalCalories(input)
totalCalories.sort((a, b) => a > b ? -1 : 1)
let answer = totalCalories[0] + totalCalories[1] + totalCalories[2] 

console.log(`Answer: ${answer}`)