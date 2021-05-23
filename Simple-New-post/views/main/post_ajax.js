// This jQuery function is for getting posts to be posted AJAXly :D 
// $(function(){
//     $('#postForm').on('submit', function(e){
//         // Get values from form
//         e.preventDefault();

//         var formData = $( this ).serialize()
//         console.log(formData)
//         // var parameters = { search: $('#search2').val() }
//         // console.log(parameters)
//         // $.ajax({
//         //     url: '/searching',
//         //     method: 'GET',
//         //     data: { parameters: parameters }
//         // }).done(function(data) {
//         //     $('#results').html(data);
//         // })
//     });
// })

$(function() {
    // Configure Cloudinary
    // with the credentials on
    // your Cloudinary dashboard
    $.cloudinary.config({ cloud_name: 'dup5vuryj', api_key: '254592227425713'});
    // Upload button
    var uploadButton = $('#postButton');
    // Upload-button event
    uploadButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'dup5vuryj', upload_preset: 'jvexcxm0', tags: ['cgal']}, 
        function(error, result) { 
            if(error) console.log(error);
            // If NO error, log image data to console
            var id = result[0].public_id;
            //console.log(processImage(id));
            console.log(id)
        });
    });
})
function processImage(id) {
    var options = {
        client_hints: true,
    };
    return '<img src="'+ $.cloudinary.url(id, options) +'" style="width: 100%; height: auto"/>';
}
