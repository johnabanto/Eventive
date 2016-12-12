var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
mongoose.Promise = global.Promise;
var gracefulShutdown;
var dbURI = 'mongodb://admin:pass1@ds115738.mlab.com:15738/wineandpaint';
/*
if (process.env.NODE_ENV === 'production') {
	dbURI = process.env.MONGOLAB_URI
}
*/
console.log(dbURI);
Grid.mongo = mongoose.mongo;
mongoose.connect(dbURI);

// add grid-fs to mongoose
mongoose.connection.once('open', function() {
	var gfs = Grid(mongoose.connection.db);
});
// Connection events
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});



// capture app termination and restart the server
gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};
// nodemon restars
process.once('SIGUSR2', function() {
	gracefulShutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});
// for app termination
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});
// for heroku app termination
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app termination', function(){
		process.exit(0);
	});
});

// bring in schemas & models
require('./users');
require('./events');
require('./messages');