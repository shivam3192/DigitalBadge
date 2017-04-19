
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Admin Schema
var AdminSchema = mongoose.Schema({
	adminName: {
		type: String,
		index:true
	},
	password: {
		type: String
	}
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(adminName, callback){
	var query = {adminName: adminName};
	Admin.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	Admin.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
