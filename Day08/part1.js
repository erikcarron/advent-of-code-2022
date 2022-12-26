let fs = require('fs')

let parseInput = input => {
  let lines = input.match(/^.+$/gm)

  return lines.map(l => l.split('').map(h => parseInt(h, 10)))
}

let calculateTreesVisible = trees => {
  let visibleTrees = {}
  let height = trees.length
  let width = trees[0].length

  // from the top and bottom
  for (var x = 0; x < width; x++) {
    var maxHeightFromTop = -1
    var maxHeightFromBottom = -1

    for (var y = 0; y < height; y++) {
      let topY = y
      let bomttomY = height - y - 1

      let topTreeName = `${x},${topY}`
      let bottomTreeName = `${x},${bomttomY}`

      // from the top
      if (trees[topY][x] > maxHeightFromTop) {
        visibleTrees[topTreeName] = 'yes'
        maxHeightFromTop = trees[topY][x]
      }

      // from the bottom
      if (trees[bomttomY][x] > maxHeightFromBottom) {
        visibleTrees[bottomTreeName] = 'yes'
        maxHeightFromBottom = trees[bomttomY][x]
      }
    }
  }

  // from the left and right
  for (var y = 0; y < height; y++) {
    var maxHeightFromLeft = -1
    var maxHeightFromRight = -1

    for (var x = 0; x < width; x++) {
      let leftX = x
      let rightX = width - x - 1

      let leftTreeName = `${leftX},${y}`
      let rightTreeName = `${rightX},${y}`

      // from the left
      if (trees[y][leftX] > maxHeightFromLeft) {
        visibleTrees[leftTreeName] = 'yes'
        maxHeightFromLeft = trees[y][leftX]
      }

      // from the right
      if (trees[y][rightX] > maxHeightFromRight) {
        visibleTrees[rightTreeName] = 'yes'
        maxHeightFromRight = trees[y][rightX]
      }
    }
  }

  return Object.keys(visibleTrees).length
}

let input = parseInput(fs.readFileSync('input.txt').toString())
let answer = calculateTreesVisible(input)

console.log(`Answer: ${answer}`)