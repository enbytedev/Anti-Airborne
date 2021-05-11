var fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const matter = require('gray-matter');
const path = require('path');


app.use(express.static('public'));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/:article", (req, res) => {

	// read the markdown file
	const file = matter.read(__dirname + '/views/articles/' + req.params.article + '.md');
	
	// use markdown-it to convert content to HTML
	var md = require("markdown-it")();
	let content = file.content;
	var result = md.render(content);
	
	res.render("index", {
		post: result,
		title: file.data.title,
		description: file.data.description,
	});
});

app.get("/", (req, res) => {
	const posts = fs.readdirSync(__dirname + '/views/articles/').filter(file => file.endsWith('.md'));
	res.render("wiki", {
		posts: posts
	});
});

const options = {
	cert: fs.readFileSync('./sslcert/fullchain.pem'),
	key: fs.readFileSync('./sslcert/privkey.pem')
};
app.listen(80);
https.createServer(options, app).listen(443);