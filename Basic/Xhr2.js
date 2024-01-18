//--- use XMLHttpRequest 
console.log(`
--- (Xr#1) ---`)

let XMLHttpRequest = require('xhr2');
const xhr = new XMLHttpRequest();
xhr.open('GET', "https://dog.ceo/api/breeds/list/all");
xhr.onreadystatechange = function () {
    if (xhr.readyState = XMLHttpRequest.DONE) {
        try {
            const response = JSON.parse(xhr.responseText);
            //console.log(JSON.stringify(response));
            const breeds = Object.keys(response.message);
            console.log(JSON.stringify(breeds));
        } catch (error) {
            console.log(error)
        }
    }
}
xhr.send(null);