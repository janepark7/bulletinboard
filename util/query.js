const pg = require("pg");
const url = require("url");

// Create the config object
let config;

if (process.env.DATABASE_URL) {
	const params = url.parse(process.env.DATABASE_URL);
	const auth = params.auth.split(":");

	config = {
		database: params.pathname.split('/')[1],
		user: auth[0],
		password: auth[1],
		host: params.hostname,
		port: params.port,
		ssl: true
	};
}
else {
	config = {
			user: "postgres",
			database: "bulletinboard",
			password: "postgres123",
			host: "localhost",
			post: 5423,
	};
}

// Handle missing config args
if (!config.user || !config.database) {
	console.error("Missing database configuration!", config);
	process.exit(1);
}


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
