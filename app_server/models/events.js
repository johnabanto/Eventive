var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	eventname: {
		type: String,
		required: true
	},
	companyname: {
		type: String,
		required: true
	},
	companyid: {
		type: mongoose.Schema.Types.ObjectId,
		required: false
	},
	datetime: {
		type: Date,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	long: {
		type: String,
		required: true
	},
	lat: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	attendees: [{
		attendeeid: mongoose.Schema.Types.ObjectId,
		attendeename: String, 
		attendeenumber: String, 
		checkin: Boolean,
		_id: false
	}],
}, {versionKey: false});

mongoose.model('Event', eventSchema);