$(document).ready( () => {
    $("#postButton").click((event) => {
        //stop submit the form, we will post it manually.
        event.preventDefault();
        doAjax();
    });
 
});

// For re-usability of delete and edit, we need to bind post id to each posts too
function doAjax() {
	var form = $('#postForm')[0];
	var data = new FormData(form);

    console.log(data.get('title'))
	
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
            $('#newPost').prepend(
                $('<div></div>').load('/load_ajax/post.ejs', function(){
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
                    
                    $(this).find('#username').text(data.username)
                    $(this).find('#title').text(data.title)
                    $(this).find('#description ').text(data.description)
    
                    // Bind post_id to div posty of each new post - AJAX add only
                    $(this).find('#posty_ajax').attr("post_id", data.postID)
    
                    if(data.img !== undefined){
                        $(this).find('#img').html('<img alt="" src="'+data.img.path+'">')
                    }
                    if(data.url_video !== undefined){
                        $(this).find('#url_video').html('<iframe title="yb_video" width="500" height="300" src="https://www.youtube.com/embed/'+data.url_video+'" frameborder="0">')
                    }
                    
                    // Send postID to editPost and delPost value so they can identify which post to perform
                    $(this).find('#editPost').html('<a class="post-edit active" id="editLink" class="edit" href="#" title="" value="'+data.postID+'">Edit Post</a>')
                    $(this).find('#delPost').html('<a id="delLink" href="#" title="" value="'+data.postID+'">Delete Post</a>')
                }) 
            )
        },
        error: (e) => {
            $("#confirmMsg").text(e.responseText);
        }
    });
}

/////////////////////////////////// Remove posts by AJAX /////////////////////////////////////
$(document).on("click", "#delLink", function(){
    // a tag has no attr value so we should use attr() here to read it out
    var post_id = $(this).parent().find('#delLink').attr("value")

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
})

//////////////////////////////////////// Edit Post by AJAX ///////////////////////////
$(document).on("click", "#editLink", function(){
    var post_id = $(this).parent().find('#editLink').attr("value")

    $.ajax({
        type: "POST",
        url:'/editPost',
        data: {post_id: post_id},
        success:function(data){
            if(data){
                
                // Remove the whole div contains new post 
                $('#titleEdit').attr("value", data.title)
                $('#descEdit').val(data.description)
                $('#urlEdit').attr("value", "https://www.youtube.com/watch?v=" + data.url_video)
            }else{
                console.log('data cannot be deleted');
            }
        },
        error:function(data){
            console.log('Server error')
        }
    });
    
})

$('#editForm').ready(function(){
    $('#editForm').on("click", "#editButton", function(e){
        e.preventDefault();

        var form = $('#editForm')[0];
	    var data = new FormData(form);

        console.log(data.get('title'))
        console.log(data.get('description'))

        post_infor = {title: data.get('title'), desc: data.get('description')}

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url:'/submitEdit',
            data: post_infor
        });
    })
})