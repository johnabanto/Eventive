var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {
	// if no user ID exists in the JWT return 401
	if (!req.payload._id) {
		res.status(401).json({
			"message" : "UnauthorizedError: private profile"
		});
	} else {
		// continue otherwise
		User
			.findById(req.payload._id)
			.exec(function(err, user) {
				res.status(200).json(user);
			});
	}
};

module.exports.profileEdit = function(req, res) {
	User.findById(req.params.profile_id, function (err, user){
		user.name = req.body.name;
		user.email = req.body.email;
		user.number = req.body.number;
		return user.save(function(err) {
			if (err) console.log(err);
			else console.log("profile updated");
			return res.status(200).json(user);
		});
	});
};