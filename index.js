const db = require("./db/connection");
const CMS = require("./lib/questions");
var figlet = require("figlet");

// Connect to the database
db.connect((err) => {
    // figlet for ASCII art
    figlet("Etrak", function(error, data) {
        if (error) {
            console.log("Does Not Compute.");
            console.dir(err);
            return;
        }
        console.log(data);
        if (err) throw err;
        // Start The Application
        new CMS().getMenu();
    });
});