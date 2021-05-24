// This is straight from the internet so it will perform .get method from ajax
$(function(){
    $('#search').on('keyup', function(e){
        if(e.keyCode === 13) {
            console.log('We are here')
            var parameters = { search: $(this).val() };
                $.get( '/searching',parameters, function(data) {
                    console.log(data)
                    $('#results').html(data);
                });
       };
    });
});

// I created a search function for my search button from index2.ejs
$(function(){
    $('#searchButton').on('click', function(e){
        // Get value from search box 
        var parameters = { search: $('#search2').val() }
        console.log(parameters)
        $.ajax({
            url: '/searching',
            method: 'GET',
            data: { parameters: parameters }
        }).done(function(data) {
            $('#results').html(data);
        })
    })
})