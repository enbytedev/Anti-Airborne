require('dotenv').config({path:"__dirname/.env"});
const fs = require('fs');
var colors = require('colors');
var colors = require('colors/safe');

const appName = process.env.applicationName;
const orgName = process.env.organizationName;

var template = `---
title: "Example"
description: "Description"
---

Markdown formatted article here.
`

var home = `<html>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
<head>
  <title>${appName}</title>
  <meta property="og:title" content="${appName}">
  <meta property="og:site_name" content="">
  <meta property="og:url" content="">
  <meta property="og:description" content="${appName}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="">
  <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
</head>
<body>
  <div class="titlebar">
    <a href="#">Home</a>
  </div>
  <div id="wiki">
    <div class="jumbotron">
      <p align="center"><a><img src="./icon.png" width="400" height="400" /></a></p>
      <h1 align="center">${appName}</h1>
      <hr>
      <h2 align="center">Knowledgebase articles are listed below...</h2>
      <br>
    <% for (post of posts) { %>
      <a href="/<%= post.slice(0, -3) %>">
        <div class="post">
          <button class="button"><%= post.replace(/.md|-/g, ' '); %></button>
        </div>
      </a>
    <% } %>
  </div>
  </div>
  <div class="jumbotron">
    <p align="center">
      <a href="https://github.com/Aerial-Laptop/Anti-Airborne/">
        <img alt="GitHub // Anti Airborne" src="https://img.shields.io/badge/GitHub-Anti%20Airborne-0099D2?style=for-the-badge" />
      </a>
      <details align="center">
        <summary><b>Developer's Ask</b></summary>
        Though not a requirement to satisfy the license of this project, Aerial Laptop, Enbyte, and all participating contributors to make this possible would greatly appreciate that the above badge remain visible on any modifications to this homepage. <br>
          In addition, we would love to talk to developers who self-host their instance for feedback on this software! Feel free to contact us via <b>aeriallaptop (a) enbyte.dev</b>
      </details>
      <details align="center">
        <summary><b>Disclaimer / License</b></summary>
        Aerial Laptop, Enbyte, and any other contributors/maintainers are not responsible for any aspect of user-hosted instances per "Disclaimer of Warranty" & "Limitation of Liability" in the <a href="https://www.gnu.org/licenses/agpl-3.0-standalone.html">AGPL-3.0-only</a> <a href="https://spdx.org/licenses/AGPL-3.0-only.html">(SPDX)</a> license.
      </details>
  </div>
  <footer>
    <p class="text-center text-muted">If your question was not answered, please contact us!</p>
    <p class="text-center text-muted">&copy; <b>${orgName} 2022</b></p>
  </footer>
</body>
<style>
.button {
  background-color: #008CBA; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
} 
.titlebar {
  overflow: hidden;
  background-color: #333;
}
.titlebar a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 24px;
}
  </style>
</html>
`

var article = `
<html>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
  <head>
    <title><%= title %></title>
    <meta property="og:title" content="<%= title %>">
    <meta property="og:site_name" content="">
    <meta property="og:url" content="">
    <meta property="og:description" content="<%= description %>">
    <meta property="og:type" content="article">
    <meta property="og:image" content="">
    <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
  </head>
  <body>
	<div class="titlebar">
		<a href="/"><i class="fa-solid fa-arrow-left-long"></i> Home</a>
	</div>
    <div id="wiki">
      <main>
        <div class="jumbotron">
          <h1><%= title %></h1>
          <p><%= description %></p>
          <hr>
        </div>
        <div class="jumbotron">
          <%- post %>
        </div>
      </main>
    </div>
  </body>
  <footer>
    <p class="text-center text-muted">&copy; <b>${orgName} 2022</b></p>
  </footer>
	<style>
	.button {
		background-color: #008CBA; /* Green */
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
	} 
	.titlebar {
		overflow: hidden;
		background-color: #333;
	}
	.titlebar a {
		float: left;
		color: #f2f2f2;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
		font-size: 24px;
	}
		</style>
</html>
`



fs.writeFileSync(`./views/article.ejs`, article);
console.log("> ".green.bold+"Successfully created the article.ejs page.".grey);

fs.writeFileSync(`./views/home.ejs`, home);
console.log("> ".green.bold+"Successfully created the home.ejs page.".grey);

fs.writeFileSync(`./articles/template.md`, template);
console.log("> ".green.bold+"Successfully created template.md.".grey);