const fs = require('fs');

//--- (1) synchronous reading node specific
//https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
console.log(`
--- (Lf#1) ---`)

const data = fs.readFileSync("./number3.txt", { encoding: 'utf8' });
console.log(1,data);


//--- (2) wrap synchronous reading to promise task 
//https://stackoverflow.com/questions/17068610/read-a-file-synchronously-in-javascript
console.log(`
--- (Lf#2) ---`)

async function wrapSyncRead() {
  let task = await new Promise((resolve,reject) => {
      try {
          const data = fs.readFileSync("./number3.txt", { encoding: 'utf8' });
          console.log(2, data);
      } catch (err) {
          console.log(err);
      }
  })
  return data;
};

console.log(wrapSyncRead())

//--- (3) standard asynchronous reading 
//https://nodejs.dev/en/learn/reading-files-with-nodejs/
console.log(`
--- (Lf#3) ---`)

const fs1 = require('fs/promises');
async function AsyncRead() {
  try {
    const data = await fs1.readFile("./number3.txt", { encoding: 'utf8' });
    console.log(3, data);
  } catch (err) {
    console.log(err);
  }
}
console.log('end')
console.log(AsyncRead())

