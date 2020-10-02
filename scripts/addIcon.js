const colors = require('colors/safe');
const fs = require('fs');
const mime = require('mime-types');
const manifestJS = require('./manifest.js');
const dir = process.cwd();
function colorOption(str) {
  return colors.bgWhite(colors.black(str));
}
const fields = [
    new manifestJS.field("src", "src (Source path to image, default: src/img/image.png)", "src/img/image.png"),
    new manifestJS.field("type", "type (Type of icon file, either mime-types or auto for auto detection based on the path from src, default: auto)", "auto"),
    new manifestJS.field("sizes", "sizes (Size of icon, recommended: 192x192, default: 192x192)", "192x192"),
    new manifestJS.field("purpose", `purpose (style of icon, either ${colorOption("any")} or ${colorOption("maskable")}, default: any)`, "any")
]
let count = 0;
let manifest;
let obj = {};
fs.readFile(dir + "/manifest.webmanifest", (error, data) => {
      if (error) {console.log(error); process.exit()}
      else {
          try {
            manifest = JSON.parse(data.toString());
          }
          catch(err) {}
      }
});

function run(rl) {
    if (!('icons' in manifest)) {
      manifest['icons'] = [];
    }
    if (count === fields.length) {
        manifest['icons'].push(obj);
        rl.close();
        writeFile();
    }
    else if (count !== fields.length) {
        rl.question(fields[count].description + ": ", answer => {
            if (answer.trim().length == 0) {
              obj[fields[count].name] = fields[count].def;
              answer = fields[count].def;
            }
            else {
              obj[fields[count].name] = answer;
            }
            if (answer.trim().toLowerCase() === "auto" && count === 1) {
              let detectedMime = mime.lookup(obj['src']);
              if (detectedMime === false) {
                console.log(detectedMime);
                process.exit();
              }
              else {
                obj[fields[count].name] = detectedMime;
              }
            }
            console.log("\t");
            count++;
            run(rl);
        });
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
