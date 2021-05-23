$(function() {
    // Configure Cloudinary
    // with the credentials on
    // your Cloudinary dashboard
    $.cloudinary.config({ cloud_name: 'dup5vuryj', api_key: '254592227425713'});
    // Upload button
    var uploadButton = $('#submit');
    // Upload-button event
    uploadButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'dup5vuryj', upload_preset: 'jvexcxm0', tags: ['cgal']}, 
        function(error, result) { 
            if(error) console.log(error);
            // If NO error, log image data to console
            var id = result[0].public_id;
            console.log(processImage(id));
        });
    });
})
function processImage(id) {
    var options = {
        client_hints: true,
    };
    return '<img src="'+ $.cloudinary.url(id, options) +'" style="width: 100%; height: auto"/>';
}