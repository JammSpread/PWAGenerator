const colors = require('colors/safe');
const fs = require('fs');
const dir = process.cwd();
class field {
  constructor(name, description, def) {
      this.name = name;
      this.description = description;
      this.def = def;
  }
}
const fields = [
  new field("src", "src (Source path to image, default: src/img/image.png)", "src/img/image.png"),
  new field("type", "type (Type of icon file, either mime or some extensions, default: png)", "png"),
  new field("sizes", "sizes (Size of icon, recommended: 192x192, default: 192x192)", "192x192")
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