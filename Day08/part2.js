let fs = require('fs')

let parseInput = input => {
  let lines = input.match(/^.+$/gm)
  return lines.map(l => l.split('').map(x => ({ height: parseInt(x, 10) })))
}

let calculateScenicScore = trees => {
  let height = trees.length
  let width = trees[0].length

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      trees[y][x].scoreUp = calculateScenicScoreUp(trees, x, y)
      trees[y][x].scoreDown = calculateScenicScoreDown(trees, x, y)
      trees[y][x].scoreLeft = calculateScenicScoreLeft(trees, x, y)
      trees[y][x].scoreRight = calculateScenicScoreRight(trees, x, y)
      trees[y][x].score = trees[y][x].scoreUp * trees[y][x].scoreDown * trees[y][x].scoreLeft * trees[y][x].scoreRight
    }
  }
}

let calculateScenicScoreUp = (trees, x, y) => {
  var score = 0
  var checkY = y - 1

  while (checkY >= 0) {
    score++

    if (trees[checkY][x].height >= trees[y][x].height) {
      break
    }

    checkY--
  }

  return score
}

let calculateScenicScoreDown = (trees, x, y) => {
  let height = trees.length
  var score = 0
  var checkY = y + 1

  while (checkY < height) {
    score++

    if (trees[checkY][x].height >= trees[y][x].height) {
      break
    }

    checkY++
  }

  return score
}

let calculateScenicScoreLeft = (trees, x, y) => {
  var score = 0
  var checkX = x - 1

  while (checkX >= 0) {
    score++

    if (trees[y][checkX].height >= trees[y][x].height) {
      break
    }

    checkX--
  }

  return score
}

let calculateScenicScoreRight = (trees, x, y) => {
  let width = trees[0].length
  var score = 0
  var checkX = x + 1

  while (checkX < width) {
    score++

    if (trees[y][checkX].height >= trees[y][x].height) {
      break
    }

    checkX++
  }

  return score
}

let findMaxScenicScore = (trees) => {
  let height = trees.length
  let width = trees[0].length
  var maxScore = 0

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      if (trees[y][x].score > maxScore) {
        maxScore = trees[y][x].score
      }
    }
  }

  return maxScore
}

let input = parseInput(fs.readFileSync('input.txt').toString())

calculateScenicScore(input)

let answer = findMaxScenicScore(input)

console.log(`Answer: ${answer}`)