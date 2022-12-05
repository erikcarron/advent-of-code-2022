let fs = require('fs');

let parseInput = input => {
  let lines = input.match(/^.+$/gm)
  let pattern = /^(\w) (\w)$/mi

  return lines.map(l => {
    let match = l.match(pattern)

    return { opponent: parsePlay(match[1]), result: parseResult(match[2]) }
  })

}

let parsePlay = p => {
  switch (p) {
    case 'A':
      return 'Rock'
    case 'B':
      return 'Paper'
    case 'C':
      return 'Scissors'
  }

  return 'Unknown'
}

let parseResult = p => {
  switch (p) {
    case 'X':
      return 'lose'
    case 'Y':
      return 'tie'
    case 'Z':
      return 'win'
  }

  return 'Unknown'
}

let evaluateRound = r => {
  if (r.opponent === 'Rock') {
    if (r.result === 'lose') {
      r.you = 'Scissors'
      r.score = 0 + 3
    } else if (r.result === 'tie') {
      r.you = 'Rock'
      r.score = 3 + 1
    } else if (r.result === 'win') {
      r.you = 'Paper'
      r.score = 6 + 2
    }
  } else if (r.opponent === 'Paper') {
    if (r.result === 'lose') {
      r.you = 'Rock'
      r.score = 0 + 1
    } else if (r.result === 'tie') {
      r.you = 'Paper'
      r.score = 3 + 2
    } else if (r.result === 'win') {
      r.you = 'Scissors'
      r.score = 6 + 3
    }
  } else if (r.opponent === 'Scissors') {
    if (r.result === 'lose') {
      r.you = 'Paper'
      r.score = 0 + 2
    } else if (r.result === 'tie') {
      r.you = 'Scissors'
      r.score = 3 + 3
    } else if (r.result === 'win') {
      r.you = 'Rock'
      r.score = 6 + 1
    }
  }

  return r
}

let input = parseInput(fs.readFileSync('input.txt').toString())
let results = input.map(x => evaluateRound(x))
let answer = results.reduce((accumulator, currentValue) => accumulator + currentValue.score, 0)

console.log(`Answer: ${answer}`)