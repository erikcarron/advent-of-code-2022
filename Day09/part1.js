let fs = require('fs')

let parseInput = input => {
  let lines = input.match(/^.+$/gm)
  let pattern = /^([RLUD]) (\d+)$/i

  return lines.map(l => {
    let match = l.match(pattern)

    return {
      direction: match[1],
      count: parseInt(match[2], 10)
    }
  })
}

let executeMoves = (head, tail, moves, tailHistory) => {
  moves.forEach(move => {
    for (var i = 0; i < move.count; i++) {
      moveHead(head, move.direction)
      moveTail(head, tail, tailHistory)
    }
  });
}

let moveHead = (head, direction) => {
  if (direction == 'U') {
    head.y++
  } else if (direction == 'D') {
    head.y--
  } else if (direction == 'L') {
    head.x--
  } else if (direction == 'R') {
    head.x++
  } else {
    console.error('How did we get here?')
  }
}

let moveTail = (head, tail, tailHistory) => {
  let xDifference = Math.abs(head.x - tail.x)
  let yDifference = Math.abs(head.y - tail.y)

  if ((xDifference <= 1) && (yDifference <= 1)) {
    return
  }

  if (xDifference >= 1 && yDifference >= 1) {
    if (head.x > tail.x) {
      tail.x++
    } else {
      tail.x--
    }

    if (head.y > tail.y) {
      tail.y++
    } else {
      tail.y--
    }
  } else if (xDifference > 1) {
    if (head.x > tail.x) {
      tail.x++
    } else {
      tail.x--
    }
  } else if (yDifference > 1) {
    if (head.y > tail.y) {
      tail.y++
    } else {
      tail.y--
    }
  } else {
    console.error('How did we get here?')
    return
  }

  tailHistory.push({ x: tail.x, y: tail.y })
}

let onlyUnique = (value, index, self) => self.indexOf(value) === index

let input = parseInput(fs.readFileSync('input.txt').toString())

var head = { x: 0, y: 0 }
var tail = { x: 0, y: 0 }
var tailHistory = [{ x: 0, y: 0 }]

executeMoves(head, tail, input, tailHistory)

let answer = tailHistory.map(h => `${h.x},${h.y}`).filter(onlyUnique).length

console.log(`Answer: ${answer}`)