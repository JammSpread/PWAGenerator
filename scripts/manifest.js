class field {
    constructor(name, description, def) {
        this.name = name;
        this.description = description;
        this.def = def;
    }
}

function writeFile(fs, obj, dir, colors) {
    fs.writeFile(dir + "/manifest.webmanifest", JSON.stringify(obj, null, '\t'), function(error) {
        if (error) console.log("ERROR : " + error);
        else {
            console.log(colors.yellow("Done!"));
            console.log(colors.bgBlack(`Add to HTML Head: \n<link rel="manifest" href="${dir + "/manifest.webmanifest"}">`));
        }
    });
}

module.exports = {
  field, writeFile
};