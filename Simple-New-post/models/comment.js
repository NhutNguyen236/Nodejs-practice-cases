var mongoose = require('mongoose')
var Schema = mongoose.Schema

comentSchema = new Schema( {
    userid: String,
    postid:String,
	content: String,
    img:String,
    
}, {collection: 'post'}),

// model is very important, point to the right database(model) name to get access correctly
Comment1 = mongoose.model('Comments', comentSchema)

// So we are now in Users.user
module.exports = Comment1;