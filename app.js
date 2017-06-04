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
	if (req.body.title === "") {
		res.redirect('/error?message=You%20Need%20Both%20Items%20To%20Post');
		return;
}
	else if (req.body.body === "") {
		res.redirect('/error?message=You%20Need%20Both%20Items%20To%20Post');
		return;
}

	// else if (req.body.title === "" || req.body.body ==="")
	// 	res.send("You need BOTH items to post!")
	// );

	Bulletin.add([req.body.title, req.body.body])
		.then(function() {
			renderBoard(res, "Saved " + req.body.title);
		});
});


app.get("/form", function (req, res) {
	res.render("form", {
		title: req.body.title,
		body: req.body.body,
	});
//	insert David Bowie 404 - Oh you pretty errors!
});

app.get("/error", function(req, res) {
	res.render("error");
});

// app.get("*", function (req, res) {
// 	res.send('<img src="/css/images/bowie.jpg">');
// //	insert David Bowie 404 - Oh you pretty errors!
// });

const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening at http://localhost:" + port);
});
