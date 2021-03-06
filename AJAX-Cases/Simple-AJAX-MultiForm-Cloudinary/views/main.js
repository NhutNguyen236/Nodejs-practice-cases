$(document).ready( () => {
    $("#btnSubmit").click((event) => {
        //stop submit the form, we will post it manually.
        event.preventDefault();
        doAjax();
    });
 
});
 
function doAjax() {
	var form = $('#applicationForm')[0];
	var data = new FormData(form);
	
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/upload",
        data: data,
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        success: (data) => {      
            $('#fnResult').text(data.firstname)
            $('#lnResult').text(data.lastname)
            // You can inject html tag here too
            $('#imgPlace').html('<img src="'+data.file.path+'" alt="">')
			//reset form
			
        },
        error: (e) => {
            $("#confirmMsg").text(e.responseText);
        }
    });
}