var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	roll_no: {
		type: String,
		index:true
	},
	userName: {
		type: String
	},
	credit: {
		type: String
	},
	sem: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.userName, salt, function(err, hash) {
	        newUser.userName = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(roll_no, callback){
	var query = {roll_no: roll_no};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
/*
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});*/
}
