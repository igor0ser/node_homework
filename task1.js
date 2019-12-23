const { Transform } = require('stream')

function processLineByLine() {
  const uppercase = new Transform({
    transform: (chunk, encoding, done) => {
      const result = [...chunk.toString()].reverse().join('') + '\n\n'
      done(null, result)
    },
  });

  process.stdout.write('Please enter you text to see it reversed \n\n')
  process.stdin
    .pipe(uppercase)
    .pipe(process.stdout)
}

processLineByLine()