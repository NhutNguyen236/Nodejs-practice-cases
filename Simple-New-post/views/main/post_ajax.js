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
            $('#posts-section').load("../load_ajax/post.html",{})
        },
        error: (e) => {
            $("#confirmMsg").text(e.responseText);
        }
    });
}