var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var client = require('twilio')('AC2462a311593e3dd3e1572b131303d4fa', 'c03c3877729224147ce7aa437113e75f');


module.exports.testTwilio = function (req, res) {
	client.sendMessage({
		to:'+16613001234', // Any number Twilio can deliver to
    	from: '+16193040115', // A number you bought from Twilio and can use for outbound communication
    	body: 'I like turtles' // body of the SMS message
	}, 
	function(err, response) {
		if(err) res.send(err);
		else {
			console.log("It worked");
			console.log(response.body);
			res.status(200).json(response.body);
		}
	});
}

module.exports.sendGroupMessages = function(req, res) {
	var count;
	req.body.attendees.forEach(function(attendee) {
		client.sendMessage({
			to:'+1' + attendee.attendeenumber, // Any number Twilio can deliver to
    		from: '+16193040115', // A number you bought from Twilio and can use for outbound communication
    		body: "Hi! " + attendee.attendeename // body of the SMS message
		});
	}, count++);
	res.status(200).json({"Messages Send": count});
}