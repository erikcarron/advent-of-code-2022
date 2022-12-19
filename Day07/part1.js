let fs = require('fs')
const { isArgumentsObject } = require('util/types')

let parseInput = input => input.match(/^.+$/gm)

let processInput = input => {
  let fileSystem = {
    '/': {
      name: 'root', path: '/', type: 'directory', parent: 'n/a'
    }
  }

  var currentDirectory = ''

  for (var i = 0; i < input.length; i++) {
    let command = input[i]

    if (command.startsWith('$ cd')) {
      currentDirectory = processChangeDirectoryCommand(command, currentDirectory)
    } else if (command.startsWith('$ ls')) {
      let output = []

      while (((i + 1) < input.length) && !input[i + 1].startsWith('$')) {
        i++
        output.push(input[i])
      }

      processListCommend(command, currentDirectory, output, fileSystem)
    } else {
      console.error(`Something went wrong with: ${input[i]}`)
    }
  }

  return fileSystem
}

let processChangeDirectoryCommand = (command, currentDirectory) => {
  let pattern = /\$ cd (.+)/i
  let match = command.match(pattern)
  let argument = match[1]

  if (argument == '/') {
    return '/'
  } else if (argument == '..') {
    return currentDirectory.lastIndexOf('/') == 0 ? '/' : currentDirectory.slice(0, currentDirectory.lastIndexOf('/'))
  } else {
    return currentDirectory.endsWith('/') ? `${currentDirectory}${argument}` : `${currentDirectory}/${argument}`
  }
}

let processListCommend = (command, currentDirectory, output, fileSystem) => {
  let dirPattern = /dir (.+)/i
  let filePattern = /(\d+) (.+)/i

  output.forEach(element => {
    let dirMatch = element.match(dirPattern)

    if (dirMatch) {
      let name = dirMatch[1]
      let path = currentDirectory.endsWith('/') ? `${currentDirectory}${name}` : `${currentDirectory}/${name}`
      fileSystem[path] = { name: name, path: path, type: 'directory', parent: currentDirectory }
    } else {
      let fileMatch = element.match(filePattern)

      let size = parseInt(fileMatch[1], 10)
      let name = fileMatch[2]
      let path = currentDirectory.endsWith('/') ? `${currentDirectory}${name}` : `${currentDirectory}/${name}`
      fileSystem[path] = { name: name, path: path, type: 'file', size: size, parent: currentDirectory }
    }
  })
}

let calculateDirectorySizes = fileSystem => {
  let directories = []
  let files = []
  let directorySizes = {}

  Object.keys(fileSystem).forEach((key, index) => {
    let item = fileSystem[key]

    if (item.type == 'directory') {
      directories.push(item)
    } else {
      files.push(item)
    }
  })

  directories.forEach(directory => {
    directorySizes[directory.path] = {}
    directorySizes[directory.path].size = 0

    files.forEach(file => {
      if (file.parent.startsWith(directory.path)) {
        directorySizes[directory.path].size += file.size
      }
    })
  })

  return directorySizes
}

let input = parseInput(fs.readFileSync('input.txt').toString())
let fileSystem = processInput(input)
let directorySizes = calculateDirectorySizes(fileSystem)
let answer = Object.keys(directorySizes).reduce((accumulator, currentValue) => directorySizes[currentValue].size <= 100000 ? accumulator + directorySizes[currentValue].size : accumulator, 0)

console.log(`Answer: ${answer}`)