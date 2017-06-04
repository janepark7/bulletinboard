const query = require("./query");

const Bulletin = {
	getAll: function() {
		return query("SELECT * FROM messages")
		.then(function(res) {
			console.log("All users", res.rows);
			 return res.rows;
		});
		
},
	add: function(messages) {
		return query("INSERT INTO messages (title, body) VALUES ($1, $2)", messages);
		console.log(messages);
	},
};

module.exports = Bulletin;
