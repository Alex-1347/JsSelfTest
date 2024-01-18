//https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs

//--- simple Express API REST server on port 3000
console.log(`
--- (Ex#1) ---`)

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking/", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {
  let counter = 0;
  for (let i = 0; i < 20_000_000_000; i++) {
    counter++;
  }
  res.status(200).send(`result is ${counter}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});