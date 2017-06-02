const query = require("./query");

const Bulletin = {
	getAll: function(callback) {
		query("SELECT id, title, body, created FROM messages").then(function(res) {
			 callback(res.rows);
		});
	},

	// catch(function(err) {
	// 	console.error("Unable to get users from db", err);
	// });

	add: function(messages) {
		console.log(messages);
	},
};

module.exports = Bulletin;
