const colors = require('colors/safe');
const fs = require('fs');
const manifestJS = require('./manifest.js');
const dir = process.cwd();
const fields = [
  new manifestJS.field("src", "src (Source path to image, default: src/img/image.png)", "src/img/image.png"),
  new manifestJS.field("type", "type (Type of icon file, either mime or some extensions, default: png)", "png"),
  new manifestJS.field("sizes", "sizes (Size of icon, recommended: 192x192, default: 192x192)", "192x192")
]
let obj = {};
let count = 0;
let manifest;
fs.readFile(dir + "/manifest.webmanifest", (error, data) => {
  if (error) {console.log(error); process.exit()}
  else {
    manifest = JSON.parse(data.toString());
  }
});

function run(rl) {
  if (count === fields.length) {
    rl.close();
    writeFile();
  }
  else if (count !== fields.length) {
    count++;
    run(rl);
  }
}

function writeFile() {
    fs.writeFile(dir + "/manifest.webmanifest", JSON.stringify(manifest, null, '\t'), function(error) {
        if (error) console.log("ERROR : " + error);
        else {
            console.log(colors.yellow("Done!"));
            console.log(colors.bgBlack(`Add to HTML Head: \n<link rel="manifest" href="${dir + "/manifest.webmanifest"}">`));
        }
    });
}

module.exports = {
    run
}