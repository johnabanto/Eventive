'use strict';

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

module.exports.postFile = function(req, res) {
 
	var part = req.files.filefield;
 	console.log(part);
    var writeStream = gfs.createWriteStream({
    	filename: part.name,
    	mode: 'w',
    	content_type:part.mimetype,
    	metadata: {
    		userId: req.body.userId
    	}
    });
 
	writeStream.on('close', function() {
		return res.status(200).send({
			message: 'Success'
		});
    });
                
    writeStream.write(part.data);
    writeStream.end();
}

module.exports.read = function(req, res) {
 
	gfs.files.find({ 'metadata.userId' : req.params.userId }).toArray(function (err, files) {
 
 	    if(files.length===0){
			return res.status(400).send({
				message: 'File not found'
			});
 	    }
		
		res.writeHead(200, {'Content-Type': files[0].contentType});
		
		var readstream = gfs.createReadStream({
			  filename: files[0].filename
		});
 
	    readstream.on('data', function(data) {
	        res.write(data);
	    });
	    
	    readstream.on('end', function() {
	        res.end();        
	    });
 
		readstream.on('error', function (err) {
		  console.log('An error occurred!', err);
		  throw err;
		});
		
		/* grab only files not the data binded to it
		if (err)
            res.send(err);
        res.json(files);
        */
	});
}

module.exports.noImg = function(req, res) {

	gfs.files.find({ 'metadata.userId' : "0" }).toArray(function (err, files) {
 
 	    if(files.length===0){
			return res.status(400).send({
				message: 'File not found'
			});
 	    }
		
		res.writeHead(200, {'Content-Type': files[0].contentType});
		
		var readstream = gfs.createReadStream({
			  filename: files[0].filename
		});
 
	    readstream.on('data', function(data) {
	        res.write(data);
	    });
	    
	    readstream.on('end', function() {
	        res.end();        
	    });
 
		readstream.on('error', function (err) {
		  console.log('An error occurred!', err);
		  throw err;
		});
		
		/* grab only files not the data binded to it
		if (err)
            res.send(err);
        res.json(files);
        */
	});
}