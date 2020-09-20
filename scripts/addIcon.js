const fields = [
  
]
let count = 0;

function run(rl) {
  if (count === fields.length) {
    rl.close();
  }
}

module.exports = {
    run
}