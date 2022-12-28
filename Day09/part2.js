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

let executeMoves = (knots, moves) => {
  moves.forEach(move => {
    for (var i = 0; i < move.count; i++) {
      moveHead(knots[0], move.direction)

      for (var j = 1; j < knots.length; j++) {
        moveKnot(knots[j], knots[j - 1])
      }
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

let moveKnot = (knot, leadKnot) => {
  let xDifference = Math.abs(leadKnot.x - knot.x)
  let yDifference = Math.abs(leadKnot.y - knot.y)

  if ((xDifference <= 1) && (yDifference <= 1)) {
    return
  }

  if (xDifference >= 1 && yDifference >= 1) {
    if (leadKnot.x > knot.x) {
      knot.x++
    } else {
      knot.x--
    }

    if (leadKnot.y > knot.y) {
      knot.y++
    } else {
      knot.y--
    }
  } else if (xDifference > 1) {
    if (leadKnot.x > knot.x) {
      knot.x++
    } else {
      knot.x--
    }
  } else if (yDifference > 1) {
    if (leadKnot.y > knot.y) {
      knot.y++
    } else {
      knot.y--
    }
  } else {
    console.error('How did we get here?')
    return
  }

  knot.history.push({ x: knot.x, y: knot.y })
}

let initializeKnots = count => {
  let knots = []

  for (var i = 0; i < count; i++) {
    knots.push(initializeKnot())
  }

  return knots
}

let initializeKnot = () => ({ x: 0, y: 0, history: [{ x: 0, y: 0 }] })

let onlyUnique = (value, index, self) => self.indexOf(value) === index

let input = parseInput(fs.readFileSync('input.txt').toString())

let knots = initializeKnots(10)

executeMoves(knots, input)

let answer = knots[9].history.map(h => `${h.x},${h.y}`).filter(onlyUnique).length

console.log(`Answer: ${answer}`)