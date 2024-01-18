//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

//--- (1) The Map object holds key-value pairs and remembers the original insertion order of the keys.
console.log(`
--- (Mp#1) ---`)

const sweetArray = [2, 3, 4, 5, 35]

const sweeterArray = sweetArray.map(sweetItem => {
    return sweetItem * 2
})

console.log(sweeterArray)

//--- (2) create function and function call more readable
console.log(`
--- (Mp#2) ---`)

const makeSweeter = sweetItem => sweetItem * 2;

const sweeterArray2 = sweetArray.map(makeSweeter);

console.log(sweeterArray2);

//--- (3) converting string to array Array.prototype.map.call
console.log(`
--- (Mp#3) ---`)

const name = "Hello"
const map = Array.prototype.map

const newName = map.call(name, eachLetter => {
    return `-${eachLetter}-`
})

console.log(newName)

//--- (4) can transformed to Array with entries() - IterableIterator
console.log(`
--- (Mp#4) ---`)

const arr5 = Array.from(sweetArray.entries());

console.log(arr5)

//--- (5) Reformatting Array to Objects 
console.log(`
--- (Mp#5) ---`)

const myUsers = [
    { name: 'shark', likes: 'ocean' },
    { name: 'turtle', likes: 'pond' },
    { name: 'otter', likes: 'fish biscuits' }
]

const usersByLikes = myUsers.map(item => {
    const container = {};

    container[item.name] = item.likes;
    container.age = item.name.length * 10;

    return container;
})

console.log(usersByLikes);

