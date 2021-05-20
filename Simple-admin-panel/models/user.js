var mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * username for username
 * password for password
 * role: 0 - student, 1 - Dean, 2 - ADMIN
 */
userSchema = new Schema( {
	googleID: String,
	email: String,
	username: String,
	password: String,
	role: Number
}, {collection: 'user'}),

// model is very important, point to the right database(model) name to get access correctly
User = mongoose.model('User123', userSchema)

// So we are now in Users.user
module.exports = User