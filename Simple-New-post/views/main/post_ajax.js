$(document).ready( () => {
    $("#postButton").click((event) => {
        //stop submit the form, we will post it manually.
        event.preventDefault();
        doAjax();
    });
 
});
 
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

                if(data.img !== undefined){
                    $('#img').html('<img alt="" src="'+data.img.path+'">')
                }
                if(data.url_video !== undefined){
                    $('#url_video').html('<iframe width="500" height="300" src="https://www.youtube.com/embed/'+data.url_video+'" frameborder="0">')
                }
                
            })
        },
        error: (e) => {
            $("#confirmMsg").text(e.responseText);
        }
    });
}