//--- nested ternary operator
console.log(`
--- (Ot#1) ---`);

function example(condition1, condition2, condition3, conditionOther) {
    return condition1 ? console.log(condition1)
        : condition2 ? console.log(condition2)
            : condition3 ? console.log(condition3)
                : console.log(conditionOther);
}

console.log(true, true, false)

//--- Break on block {}
console.log(`
--- (Ot#2) ---`);

foo: {
    console.log("face");
    break foo;
    console.log("this will not be executed");
}
console.log("swap");


//--- switch https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
console.log(`
--- (Ot#3) ---`);

const Animal = "Giraffe";
switch (Animal) {
    case "Cow":
    case "Giraffe":
    case "Dog":
    case "Pig":
        console.log("This animal is not extinct.");
        break;
    case "Dinosaur":
    default:
        console.log("This animal is extinct.");
}

//--- for-each loop https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
console.log(`
--- (Ot#4) ---`);

const items = ["item1", "item2", "item3"];
const copyItems = [];

items.forEach((item) => {
    copyItems.push(item);
});

console.log(copyItems)