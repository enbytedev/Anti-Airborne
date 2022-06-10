var fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const matter = require('gray-matter');
const path = require('path');
var colors = require('colors');
var colors = require('colors/safe');
require('dotenv').config({path:"./.env"})

const optionDefinitions = [
        { name: 'configure', alias: 'c', type: Boolean }
      ]
      const commandLineArgs = require('command-line-args')
      const options = commandLineArgs(optionDefinitions)
      const cliArgs = JSON.stringify(options);
      const cliArgsParsed = JSON.parse(cliArgs);
      if (cliArgsParsed.configure) {
        var fs = require('fs');
        const prompt = require("prompt-sync")({ sigint: true });
        
        var port = prompt("==> (8080) Port: ");
        if (port == "") {port = 8080;}

        var formatted = `port=${port}`
        fs.writeFileSync(`./.env`, formatted);
        console.log("> ".green.bold+"Successfully created the configuration file: ".cyan+"./.env".blue);
        console.log("> ".green.bold+`Anti Airborne has successfully been configured with the following options:\n${formatted}\n\n`+"> ".green.bold+`Filing Saucer will now exit. Please start without the --configure option to proceed to the application.`.cyan)
        process.exit()
      }

if (process.env.port == undefined) {
        console.log("X ".brightRed.bold+".env does not exist! Please run with the ".red+"--configure".brightRed.bgGray+" flag to generate it!".red);
        process.exit()
}

if (process.pkg) {
        require("./aerialhelper");  
}

app.use(express.static('public'));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join("./views"));
app.set("view engine", "ejs");

app.get("/:article", (req, res) => {

        // read the markdown file
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
});

app.get("/", (req, res) => {
        const posts = fs.readdirSync('./articles/').filter(file => file.endsWith('.md'));
        res.render("home", {
                posts: posts
        });
});

app.listen(process.env.port);
console.log(`Anti-Airborne listening on port ${process.env.port}!`.blue)
