const pg = require("pg");
const config = {
	user: "postgres",
	database: "bulletinboard",
	password: "postgres123",
	host: "localhost",
	post: 5423,
};

const pool = new pg.Pool(config);
const bodyParser = require("body-parser");

//	console.log(req.body)

//	need res.render("page/bulletinboard", {id: req.params.bulletinboard})

pool.on("error", function(err) {
	console.error("Postgres query pool encountered an error", err);
});

//	Export a simple function that just runs a query

//	Needs to be in the route and separate file
pool.query("SELECT * FROM messages")
	.then(function(res) {
		console.log("All messages", res.rows);
	})
	.catch(function(err) {
		console.error("Unable to get messages db", err);
	});

module.exports = function(queryString, values, cb) {
	return pool.query(queryString, values, cb);
	};
