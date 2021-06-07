var mongoose = require('mongoose')
var Schema = mongoose.Schema

comentSchema = new Schema( {
    commentId: String,
    content:String,
    displayname: String,
}, {collection: 'comment', timestamps: true}),

// model is very important, point to the right database(model) name to get access correctly
Comment = mongoose.model('Comment', comentSchema)

// So we are now in Users.user
module.exports = Comment;