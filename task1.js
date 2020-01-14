import { Transform } from 'stream'

function processLineByLine() {
  const reverse = new Transform({
    transform: (chunk, encoding, done) => {
      const result = [...chunk.toString()].reverse().join('') + '\n\n'
      done(null, result)
    },
  });

  process.stdout.write('Please enter you text to see it reversed \n\n')
  process.stdin
    .pipe(reverse)
    .pipe(process.stdout)
}

processLineByLine()