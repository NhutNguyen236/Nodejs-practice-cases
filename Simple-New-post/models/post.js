var mongoose = require('mongoose')
var Schema = mongoose.Schema

postSchema = new Schema( {
	title: String,
    description: String,
    img:String,
    url_video:String,
    
}, {collection: 'post', timestamps: true}),

// model is very important, point to the right database(model) name to get access correctly
Post = mongoose.model('Posts', postSchema)

// So we are now in Users.user
module.exports = Post;