global.__basedir = __dirname;

require('dotenv').config({path:"./.env"})
var fs = require('fs');
const express = require('express');
global.app = express();
const path = require('path');

// CLI constants
const optionDefinitions = [
        { name: 'configure', alias: 'c', type: Boolean }
      ]
const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)
const cliArgs = JSON.stringify(options);
const cliArgsParsed = JSON.parse(cliArgs);
      
// CLI arg handling
if (cliArgsParsed.configure) {
require("./scripts/appUtil/configure");
}

if (process.env.port == undefined) {
        console.log("X ".brightRed.bold+"Configuration is incomplete! Please run with the ".red+"--configure".brightRed.bgGray+" flag to generate it!".red);
        process.exit()
}

if (process.env.aerialhelper === "true" || process.env.aerialhelper === true) {require("./scripts/aeriallaptop/aerialhelper");}

app.use(express.static('public'));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join("./views"));
app.set("view engine", "ejs");

// Create static route for home page, assets, etc.
app.use(express.static('static'));
// Use routes.js
require("./scripts/routes");

app.listen(process.env.port);
console.log(`Anti-Airborne listening on port ${process.env.port}!`.blue)
