// https://nodejs.dev/en/learn/accept-input-from-the-command-line-in-nodejs/

//--- console input on node
console.log(`
--- (Cr#1) ---`)

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`);
  readline.close();
});
