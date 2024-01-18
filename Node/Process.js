//https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js

//--- print Node process list 
console.log(`
--- (Tp#1) ---`)

const process_name = process.argv.slice(2)[0];
console.log(process.argv)
count = 0;
while (true) {
  count++;
  if (count == 2000 || count == 4000) {
    console.log(`${process_name}: ${count}`);
  }
}

//--- node Threading/Process &
`[2] 24624
admin@localhost:~/AngularProjects/JS> Debugger attached.
[
  '/home/admin/Downloads/node-v16.19.0-linux-x64/bin/node',
  '/home/admin/AngularProjects/JS/Threading/Process'
]
undefined: 2000
undefined: 4000`

  //-- node Threading/Process A & hreading/Process B &
  `[5] 25745
[6] 25746
bash: hreading/Process: No such file or directory
[6]+  Exit 127                hreading/Process B
admin@localhost:~/AngularProjects/JS> Debugger attached.
[
  '/home/admin/Downloads/node-v16.19.0-linux-x64/bin/node',
  '/home/admin/AngularProjects/JS/Threading/Process',
  'A'
]
A: 2000
A: 4000`