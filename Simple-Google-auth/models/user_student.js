var mongoose = require('mongoose')
var Schema = mongoose.Schema

userSchema = new Schema( {
	googleID: String,
	email: String,
	role: Number
}, {collection: 'user'}),

// model is very important, point to the right database(model) name to get access correctly
User = mongoose.model('User', userSchema)

// So we are now in Users.user
module.exports = User