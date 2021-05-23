$(function(){
    $('#search').on('keyup', function(e){
        if(e.keyCode === 13) {
            console.log('We are here')
            var parameters = { search: $(this).val() };
                $.get( '/searching',parameters, function(data) {
                    $('#results').html(data);
                });
       };
    });
});