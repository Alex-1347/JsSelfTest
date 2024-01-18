//--- Goto on Continue https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label#using_a_labeled_continue_with_for_loops

console.log(`
--- (Gt#1) ---`);

loop1: for (let i = 0; i < 3; i++) {
    // The second for statement is labeled "loop2"
    loop2: for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            continue loop1;
        }
        console.log(`i = ${i}, j = ${j}`);
    }
}

//--- Goto on Break for
console.log(`
--- (Gt#2) ---`);

let i, j;

// The first for statement is labeled "loop1"
loop1: for (i = 0; i < 3; i++) {
    // The second for statement is labeled "loop2"
    loop2: for (j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break loop1;
        }
        console.log(`i = ${i}, j = ${j}`);
    }
}
