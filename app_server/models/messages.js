var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
	to: {
		type: String,
		required: true
	},
	from: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	}
}, {versionKey: false});

mongoose.model('Message', messageSchema);