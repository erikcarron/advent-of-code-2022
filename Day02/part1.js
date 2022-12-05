let fs = require('fs');

let parseInput = input => {
  let lines = input.match(/^.+$/gm)
  let pattern = /^(\w) (\w)$/mi

  return lines.map(l => {
    let match = l.match(pattern)

    return { opponent: parsePlay(match[1]), you: parsePlay(match[2]) }
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
    case 'X':
      return 'Rock'
    case 'Y':
      return 'Paper'
    case 'Z':
      return 'Scissors'
  }

  return 'Unknown'
}

let evaluateRound = r => {
  if (r.opponent === 'Rock') {
    if (r.you === 'Rock') {
      r.result = 'tie'
      r.score = 3 + 1
    } else if (r.you === 'Paper') {
      r.result = 'win'
      r.score = 6 + 2
    } else if (r.you === 'Scissors') {
      r.result = 'lose'
      r.score = 0 + 3
    }
  } else if (r.opponent === 'Paper') {
    if (r.you === 'Rock') {
      r.result = 'lose'
      r.score = 0 + 1
    } else if (r.you === 'Paper') {
      r.result = 'tie'
      r.score = 3 + 2
    } else if (r.you === 'Scissors') {
      r.result = 'win'
      r.score = 6 + 3
    }
  } else if (r.opponent === 'Scissors') {
    if (r.you === 'Rock') {
      r.result = 'win'
      r.score = 6 + 1
    } else if (r.you === 'Paper') {
      r.result = 'lose'
      r.score = 0 + 2
    } else if (r.you === 'Scissors') {
      r.result = 'tie'
      r.score = 3 + 3
    }
  }

  return r
}

let input = parseInput(fs.readFileSync('input.txt').toString())
let results = input.map(x => evaluateRound(x))
let answer = results.reduce((accumulator, currentValue) => accumulator + currentValue.score, 0)

console.log(`Answer: ${answer}`)