const fs = require('fs');
var colors = require('colors');
var colors = require('colors/safe');

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
    <title>Anti-Airborne</title>
    <meta property="og:title" content="Anti-Airborne">
    <meta property="og:site_name" content="">
    <meta property="og:url" content="">
    <meta property="og:description" content="This is a fresh-install of Anti-Airborne.">
    <meta property="og:type" content="article">
    <meta property="og:image" content="">
  </head>
  <body>
    <div class="titlebar">
      <a href="#">Anti-Airborne by Aerial Laptop</a>
    </div>
    <div id="wiki">
      <div class="jumbotron">
        <h1 align="center">Knowledgebase articles are listed below...</h1>
        <hr>
      <% for (post of posts) { %>
        <a href="/<%= post.slice(0, -3) %>">
          <div class="post">
            <button class="button"><%= post.replace(/.md|-/g, ' '); %></button>
          </div>
        </a>
      <% } %>
    </div>
    </div>
    <footer>
      <p class="text-center text-muted">If your question was not answered, please contact us!</p>
      <p class="text-center text-muted">&copy; <b>(Group) 2022</b></p>
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
    <p class="text-center text-muted">&copy; <b>(Group) 2022</b></p>
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
