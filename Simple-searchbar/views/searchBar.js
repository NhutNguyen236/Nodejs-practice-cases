$(document).ready(function(){
    $('input.typeahead').typeahead({
        name: 'countries',
        remote: 'http://localhost:3000/search?key=%QUERY',
        limit: 10
    });
});