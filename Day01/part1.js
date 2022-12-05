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

let maxCalorie = calories => calories.reduce((accumulator, currentValue) => currentValue > accumulator ? currentValue : accumulator, 0)

let input = parseInput(fs.readFileSync('input.txt').toString())
let totalCalories = calculateTotalCalories(input)
let answer = maxCalorie(totalCalories)

console.log(`Answer: ${answer}`)