global.__basedir = __dirname;

require('dotenv').config({path:"./.env"})
var fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const matter = require('gray-matter');
const path = require('path');
var colors = require('colors');
var colors = require('colors/safe');
const rateLimit = require('express-rate-limit');

// CLI constants
const optionDefinitions = [
        { name: 'configure', alias: 'c', type: Boolean },
        { name: 'regen', alias: 'r', type: Boolean }
      ]
const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)
const cliArgs = JSON.stringify(options);
const cliArgsParsed = JSON.parse(cliArgs);
      
// CLI arg handling
if (cliArgsParsed.configure) {
require("./scripts/appUtil/configure");
}
if (cliArgsParsed.regen) {
require('./scripts/appUtil/regenFiles');
}

if (process.env.port == undefined) {
        console.log("X ".brightRed.bold+".env does not exist! Please run with the ".red+"--configure".brightRed.bgGray+" flag to generate it!".red);
        process.exit()
}

if (process.env.aerialhelper === "true" || process.env.aerialhelper === true) {require("./scripts/aeriallaptop/aerialhelper");}

app.use(express.static('public'));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join("./views"));
app.set("view engine", "ejs");

const accessLimit = rateLimit({
        windowMs: 5 * 60 * 1000,
        max: process.env.accessLimit,
        standardHeaders: true,
        legacyHeaders: false,
        message: 'Too many access requests created from this IP, please try again after 5 minutes!',
})

app.get("/:article", accessLimit, (req, res) => {

        // read the markdown file
        if (req.params.article == "icon.png") {
                res.sendFile("icon.png", { root: "./static/" }, (err) => {if (err) {console.log(err);}})
        } else if (req.params.article == "favicon.ico") {
                        res.sendFile("favicon.ico", { root: "./static/" }, (err) => {if (err) {console.log(err);}})
        } else {
                const file = matter.read('./articles/' + req.params.article + '.md');

                // use markdown-it to convert content to HTML
                var md = require("markdown-it")();
                let content = file.content;
                var result = md.render(content);

                res.render("article", {
                        post: result,
                        title: file.data.title,
                        description: file.data.description,
                });
}
});

app.get("/", accessLimit, (req, res) => {
        const posts = fs.readdirSync('./articles/').filter(file => file.endsWith('.md'));
        res.render("home", {
                posts: posts
        });
});

// Create static route for home page, assets, etc.
app.use(express.static('static'));

app.listen(process.env.port);
console.log(`Anti-Airborne listening on port ${process.env.port}!`.blue)
