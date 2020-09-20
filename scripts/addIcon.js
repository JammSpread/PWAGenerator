const colors = require('colors/safe');
const fs = require('fs');
const manifestJS = require('manifestJS');
const dir = process.cwd();
const fields = [
  new manifestJS.field("src", "src (Source path to image, default: src/img/image.png)", "src/img/image.png"),
  new manifestJS.field("type", "type (Type of icon file, either mime or some extensions, default: png)", "png"),
  new manifestJS.field("sizes", "sizes (Size of icon, recommended: 192x192, default: 192x192)", "192x192")
]
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
    manifestJS.writeFile
    console.log(colors.yellow("Done!"));
  }
  else if (count !== fields.length) {
    manifest.icons[]
    count++;
  }
}

module.exports = {
    run
}