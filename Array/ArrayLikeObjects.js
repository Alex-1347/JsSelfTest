//--- array-like objects,  Aside from true arrays, there are also array-like objects that have a length property and properties with all-digits names: NodeList instances, HTMLCollection instances, the arguments object, etc.
console.log(`
--- (Aj#1) ---`)

//--- build nodeList with html-element, return promise
const page = import('../Html/HtmlDom2.js')

page.then((Html) => {

    //--- use for-of with host-provided array-like objects 
    console.log(`
--- (Aj#1) ---`)

    const divs = Html.page.childNodes
    for (const div of divs) {
        console.log(div)
    }

    //--- use Array.prototype functions with host-provided array-like objects 
    console.log(`
--- (Al#2) ---`)

    Array.prototype.forEach.call(Html.page.childNodes, (y) => {
        console.log(y)
    });

    //--- Create a true array
    console.log(`
--- (Al#3) ---`)

    const arr1 = Array.from(Html.page.childNodes)
    console.log(arr1)

    //--- Use spread syntax (...)
    console.log(`
--- (Al#4) ---`)

    const arr2 = [...Html.page.childNodes];
    console.log(arr2)

    //--- Use the slice method of arrays
    console.log(`
--- (Al#5) ---`)

    const arr3 = Array.prototype.slice.call(Html.page.childNodes);
    console.log(arr3)

})