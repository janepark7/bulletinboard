require("dotenv").config;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Bulletin = require("./util/bulletinboard");

 //	Setup the public assets to live in the assets folder
app.set("view engine", "ejs");
app.use(express.static("assets"));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/", function(req, res) {
//	res.send("Hi There!");
	Bulletin.getAll(function(result) {
		res.render("board",{
			messages: result.rows,
		});
	});
});

app.get("*", function (req, res) {
	res.send('<img src="/css/images/bowie.jpg">');
//	insert David Bowie 404 - Oh you pretty errors!
});

app.listen(3000, function() {
	console.log("Your server is available at localhost:3000!");
});
