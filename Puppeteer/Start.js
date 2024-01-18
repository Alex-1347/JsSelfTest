 //https://stackoverflow.com/questions/77121478/how-to-save-json-response-on-puppeteer-js

 console.log(`
 --- (Pp#1) ---`)

const puppeteer = require('puppeteer');
 (async () => {
   const browser = await puppeteer.launch({
     headless: true
   });
   const page = await browser.newPage();
   await page.goto('https://www.oddsportal.com/');
   await page.setViewport({ width: 1920, height: 941 });
      await page.waitForSelector('.flex:nth-child(2) > .bg-gray-extra_dark > .h-\     [16px\]');
   await page.click('.flex:nth-child(2) > .bg-gray-extra_dark > .h-\[16px\]');
   await browser.close();
 })(); 