const readLine = require('readline');

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});
const path = require('path');
const generateManifest = require('./scripts/genManifest.js');
const generateSW = require('./scripts/genSW.js');
const addIcon = require('./scripts/addIcon.js');

const statement = `Do you want to create a manifest or a service worker?
(1) Manifest
(2) Service Worker
(3) Add Icon to Manifest
Default : 1
> `;

rl.question(statement, answer => {
    if (answer === "1") {
        generateManifest.run(rl);
    }
    else if (answer === "2") {
        generateSW.run(rl);
    }
    else if (answer === "3") {
        addIcon.run(rl);
    }
    else {
        generateManifest.run(rl);
    }
});