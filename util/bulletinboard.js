const query = require("./query");

const Bulletin = {
	getAll: function(callback) {
		query("SELECT id, title, body, created FROM messages").then(function(res) {
			 callback(res.rows);
		});
	},

	add: function(messages) {

	},
};

module.exports = Bulletin;
