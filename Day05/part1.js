let fs = require('fs')

let parseInput = input => {
  let parts = input.split('\r\n\r\n')

  let drawing = parts[0]
  let procedureInput = parts[1]

  return { stacks: parseInputDrawing(drawing), procedures: parseInputProcedure(procedureInput) }
}

let parseInputDrawing = input => {
  let lines = input.match(/^.+$/gm)
  lines.reverse();

  let stackNumbers = lines.shift().match(/(\d+)/gi).map(n => parseInt(n, 10))
  let stacks = new Array(stackNumbers.length)

  for (var i = 0; i < stacks.length; i++) {
    stacks[i] = []
  }

  lines.forEach(element => {
    for (var i = 0; i < stacks.length; i++) {
      let lineIndex = (i * 4) + 1
      let value = element[lineIndex]

      if (value != ' ') {
        stacks[i].push(value)
      }
    }
  })

  return stacks
}

let parseInputProcedure = input => {
  let lines = input.match(/^.+$/gm)

  return lines.map(p => {
    let pattern = /^move (\d+) from (\d+) to (\d+)$/mi
    let match = p.match(pattern)

    let quantity = parseInt(match[1], 10)
    let origin = parseInt(match[2], 10)
    let destination = parseInt(match[3], 10)

    return { quantity: quantity, origin: origin, destination: destination }
  })
}

let processProcedure = (stacks, procedure) => {
  let originIndex = procedure.origin - 1
  let destinationIndex = procedure.destination - 1

  for (var i = 0; i < procedure.quantity; i++) {
    stacks[destinationIndex].push(stacks[originIndex].pop())
  }
}

let processProcedures = (stacks, procedures) => {
  procedures.forEach(element => {
    processProcedure(stacks, element)
  })
}

let printStacks = stacks => {
  var output = []

  var stackNumbers = ''

  for (var i = 1; i <= stacks.length; i++) {
    stackNumbers += ` ${i}  `
  }

  output.push(stackNumbers)

  let maxHeight = stacks.reduce((accumulator, currentValue) => currentValue.length > accumulator ? currentValue.length : accumulator, 0)

  for (var y = 0; y < maxHeight; y++) {
    var line = ''

    for (var x = 0; x < stacks.length; x++) {
      if (stacks[x].length > y) {
        line += `[${stacks[x][y]}] `
      } else {
        line += '    '
      }
    }

    output.push(line)
  }

  output.reverse()
  output.forEach(element => console.log(element))
}

let input = parseInput(fs.readFileSync('input.txt').toString())

printStacks(input.stacks)
processProcedures(input.stacks, input.procedures)
printStacks(input.stacks)

let answer = input.stacks.reduce((accumulator, currentValue) => accumulator + currentValue.pop(), '')

console.log(`Answer: ${answer}`)