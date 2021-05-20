var mongoose = require('mongoose')
var Schema = mongoose.Schema

profileSchema = new Schema( {
    googleID: String, // Google ID for student
    deanID: String, // ID for dean
	displayname: String,
    class: String,
    dean: String,
    imageurl: String
}, {collection: 'user-profiles'}),

// model is very important, point to the right database(model) name to get access correctly
Profile = mongoose.model('Profile', profileSchema)

// So we are now in Users.user
module.exports = Profile