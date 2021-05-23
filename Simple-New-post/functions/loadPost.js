// You can replace username with anything else
// In my actual system, I will use user_id
function loadPost(username){
    
    // Collect username with defined username
    User.findOne({username: username}) 
    .then(function (data) {
        // Collection posts_id from user
        var posts_id = []

        // Bind all post ids from returned User schema to posts
        posts_id = data.posts

        Post.find({_id: posts_id}).then(function(posts){
            console.log(posts)
        })
        
    })
    .done(function(data){
        return posts
    })
}

module.exports.loadPost = loadPost