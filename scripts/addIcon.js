const colors = require('colors/safe');
const fs = require('fs');
const dir = process.cwd();
const fields = [
  
]
let count = 0;

function run(rl) {
  let manifest = 0;
  fs.readFile(dir + "/manifest.webmanifest", (error, data) => {
    if (error) {console.log(error); process.exit()}
    else {
      manifest = JSON.parse(data.toString());
    }
  });
  if (count === fields.length) {
    rl.close();
    console.log(colors.yellow("Done!"));
    console.log(manifest.name);
  }
  else if (count !== fields.length) {
    count++;
  }
}

module.exports = {
    run
}