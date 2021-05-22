// To find username based on username as an input then return query as a promise
function userFind(username){
    var query = User.findOne({username: username}).exec() 
    return query
}

module.exports.userFind = userFind