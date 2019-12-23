const readline = require('readline');

async function processLineByLine() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  console.log('Please enter you text to see it reversed');
  rl.prompt();

  for await (const line of rl) {
    const reversedLine = [...line].reverse().join('');

    console.log(`Reversed number: ${reversedLine}`);

    rl.prompt();
  }
}
processLineByLine();
