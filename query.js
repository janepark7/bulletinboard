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

app.use(bodyParser.urlencoded());
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

app.get("/bulletinboard", function(req, res) {
	res.render("bulletinboard", {
		title: title
		id: id
		body: body
	});
});

// module.exports = function(queryString, values, cb) {
// 	return.pool.query(queryString, values, cb);
// 	};
