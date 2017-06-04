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

function renderBoard(res) {
	Bulletin.getAll()
		.then(function(messages) {
			res.render("board",{
			messages: messages
		});
	});
}

app.get("/", function(req, res) {
	renderBoard(res);
});

app.post("/", function(req, res) {
	Bulletin.add([req.body.title, req.body.body])
		.then(function() {
			renderBoard(res, "Saved " + req.body.title);
		});
});


app.get("*", function (req, res) {
	res.send('<img src="/css/images/bowie.jpg">');
//	insert David Bowie 404 - Oh you pretty errors!
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening at http://localhost:" + port);
});
