const query = require("./query");

const Bulletin = {
	getAll: function() {
		query("SELECT * FROM messages")
		.then(function(res) {
			console.log("All users", res.rows);
			 return res.rows;
		})

	.catch(function(err) {
		console.error("Not able to get users from the database", err);
	});
},
	add: function(messages) {
		return query("INSERT INTO messages (title, body) VALUES ($1, $2)", messages);
		console.log(messages);
	},
};

module.exports = Bulletin;
