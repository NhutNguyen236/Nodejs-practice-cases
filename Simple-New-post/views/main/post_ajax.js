$(document).ready( () => {
    $("#postButton").click((event) => {
        //stop submit the form, we will post it manually.
        event.preventDefault();
        doAjax();
    });

    // When user clicks on delete button added by AJAX
    $(document).on('click','#delLink',function(){
        delPost();
    })

    // When user clicks on edit button added by AJAX
    $(document).on('click','#editLink',function(){
        // Edit post is a bit different from delete post since it needs
        /**
         * Input - Post editor
         * The infor of the chosen post
         */
        editPost();
    })
 
});

// For re-usability of delete and edit, we need to bind post id to each posts too
function doAjax() {
	var form = $('#postForm')[0];
	var data = new FormData(form);
	
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/index",
        data: data,
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        success: (data) => {      
            console.log(data)
            // The data got a vague reality that sometimes we dont have video_url or img or both
            $('#newPost').load('/load_ajax/post.ejs', function(){
                //////////////////////// This algorithm needs to be fixed /////////////////////////////
                // Object.keys(data).forEach((prop)=>{
                //     if(prop == 'img'){
                //         $('#img').html('<img alt="" src="'+data[img].path+'">')
                //     }
                //     else if(prop == 'url_video'){
                //         $('#url_video').html('<iframe width="500" height="300" src="https://www.youtube.com/embed/'+data[url_video]+'" frameborder="0">')
                //     }
                //     $('#'+prop).text(data[prop])
                // })
                //////////////////////////////////////////////////////////////////////////////////////
                
                $('#username').text(data.username)
                $('#title').text(data.title)
                $('#description').text(data.description)

                // Bind post_id to div posty of each new post - AJAX add only
                $('#posty_ajax').attr("post_id", data.postID)

                if(data.img !== undefined){
                    $('#img').html('<img alt="" src="'+data.img.path+'">')
                }
                if(data.url_video !== undefined){
                    $('#url_video').html('<iframe width="500" height="300" src="https://www.youtube.com/embed/'+data.url_video+'" frameborder="0">')
                }
                
                // Send postID to editPost and delPost value so they can identify which post to perform
                $('#editPost').html('<a id="editLink" class="edit" href="#" title="" value="'+data.postID+'">Edit Post</a>')
                $('#delPost').html('<a id="delLink"  href="#" title="" value="'+data.postID+'">Delete Post</a>')
            }) 
        },
        error: (e) => {
            $("#confirmMsg").text(e.responseText);
        }
    });
}

function delPost() {
    // a tag has no attr value so we should use attr() here to read it out
    var post_id = $('#delLink').attr("value")

    $.ajax({
        type: "POST",
        url:'/deletePost',
        data: {post_id: post_id},
        success:function(response){
            if(response){
                // Remove the whole div contains new post 
                $('div[post_id="'+post_id+'"]').remove()
                console.log('Post deleted')
            }else{
                console.log('data cannot be deleted');
            }
        },
        error:function(response){
            console.log('Server error')
        }
    });
}

function delPost() {
    // a tag has no attr value so we should use attr() here to read it out
    var post_id = $('#delLink').attr("value")

    $.ajax({
        type: "POST",
        url:'/deletePost',
        data: {post_id: post_id},
        success:function(response){
            if(response){
                // Remove the whole div contains new post 
                $('div[post_id="'+post_id+'"]').remove()
            }else{
                console.log('data cannot be deleted');
            }
        },
        error:function(response){
            console.log('Server error')
        }
    });
}

function editPost() {
    // a tag has no attr value so we should use attr() here to read it out
    var post_id = $('#editLink').attr("value")

    
}