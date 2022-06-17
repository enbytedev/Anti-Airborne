var fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });
var colors = require('colors');
var colors = require('colors/safe');


console.log("Entered Setup".cyan.bold);
var port = prompt("==> (8080)".gray.bold+" Port: ".blue);
var aerialhelper = prompt("==> (true)".gray.bold+" Enable AerialHelper: ".blue);
var accessLimit = prompt("==> (40)".gray.bold+" Access Limit (PER 5 MINUTES): ".blue);
var applicationName = prompt("==> (Anti-Airborne)".gray.bold+" Application Name: ".blue);
var organizationName = prompt("==> (Aerial Laptop)".gray.bold+" Organization Name: ".blue);
if (port == "") {port = 8080;}
if (aerialhelper == "") {aerialhelper = true;}
if (accessLimit == "") {accessLimit = 40;}
if (applicationName == "") {applicationName = "Anti-Airborne";}
if (organizationName == "") {organizationName = "Aerial Laptop";}

var formatted = `port=${port}
accessLimit=${accessLimit}
applicationName=${applicationName}
organizationName=${organizationName}
aerialhelper=${aerialhelper}`
var createStream = fs.createWriteStream(`./.env`);
createStream.end();
fs.writeFileSync(`./.env`, formatted);
console.log("> ".green.bold+"Successfully created the configuration file: ".cyan+"./.env".blue);
console.log("> ".green.bold+`Anti Airborne has successfully been configured with the following options:\n${formatted}\n\n`+"> ".green.bold+`Anti Airborne will now exit. Please start without the --configure option to proceed to the application.`.cyan)
process.exit()