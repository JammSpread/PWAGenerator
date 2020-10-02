const fs = require('fs');
const colors = require('colors/safe');
const manifestJS = require('./manifest.js');
const dir = process.cwd();

function colorOption(str) {
    return colors.bgWhite(colors.black(str));
}
const fields = [
    new manifestJS.field("name", "name (full name for application, default: App)", "App"),
    new manifestJS.field("short_name", "short_name (name for application in little space, default: App)", "App"),
    new manifestJS.field("description", "description (description of the web app, default: A progressive web app.)", "A progressive web app."),
    new manifestJS.field("display", `display (${colorOption("fullscreen")}, ${colorOption("standalone")}, ${colorOption("minimal_ui")} or ${colorOption("browser")}, default: ${colorOption("browser")})`, "browser"),
    new manifestJS.field("start_url", "start_url (starting path, default: /)", "/"),
    new manifestJS.field("prefer_related_applications", `prefer_related_applications (${colorOption("true")} or ${colorOption("false")}, needs to be false to be installable, default: ${colorOption("false")})`, false)
];
const obj = {
};
let count = 0;

fs.readFile(dir + "/manifest.webmanifest", (error, data) => {
    if (!error) {
        try {
            obj = JSON.parse(data.toString());
        }
        catch(err) {}
    }
});

function run(rl) {
    if (count === fields.length) {
        rl.close();
        writeFile();
    }
    else if (count !== fields.length) {
        rl.question(fields[count].description + ": ", answer => {
            if (answer.toString().toLowerCase() === "true") {
                obj[fields[count].name] = true;
            }
            else if (answer.toString().toLowerCase() === "false") {
                obj[fields[count].name] = false;
            }
            else if (answer.trim().length == 0) {
                obj[fields[count].name] = fields[count].def;
            }
            else {
                obj[fields[count].name] = answer;
            }
            console.log("\n");
            count++;
            run(rl);
        });
    }
}

function writeFile() {
    fs.writeFile(dir + "/manifest.webmanifest", JSON.stringify(obj, null, '\t'), function(error) {
        if (error) console.log("ERROR : " + error);
        else {
            console.log(colors.yellow("Done!"));
            console.log(colors.bgBlack(`Add to HTML Head: \n<link rel="manifest" href="${dir + "/manifest.webmanifest"}">`));
            console.log(colors.blue('Installable PWAs need to have at least one icon, please add icons by rerunning this script.'));
        }
    });
}

module.exports = {
    run
}