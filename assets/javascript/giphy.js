
var sports = ['Soccer', 'Football', 'Basketball', 'Swimming'];

    function displaySport () {

        $('#sportsView').empty();

        var sport = $(this).attr('data-name');
        var queryURL = "http://api.giphy.com/v1/stickers/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10";
 
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
            
            for (i = 0; i < 10; i++) {
                
                sportWindow = $('<div id="sportWindow" data-number=' + i + '>');

                $(sportWindow).append("<p>Rating: " + response.data[i].rating + "</p><br>");

                $(sportWindow).append('<img src=' + response.data[i].images.original_still.url + ' data-still=' + response.data[i].images.original_still.url + ' data-animate=' + response.data[i].images.original.url + ' data-state="still" class="sports">');

                $('#sportsView').prepend(sportWindow); 
            }

            

            $('#sportsView').fadeOut('fast').fadeIn('slow');

            $('.sports').on('click', function () {
                var state = $(this).attr('data-state');
                console.log(state);
                
                if (state === 'still') {
                    $(this).attr('src', $(this).attr('data-animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    var variable2 = $(this).attr('data-still');
                    $(this).attr('src', variable2);
                    $(this).attr('data-state', 'still'); 
                }
            });
        });
    };

    

    function renderButtons(){ 

        $('#buttonsView').empty();

        for (var i = 0; i < sports.length; i++){ 
            var a = $('<button>');
            a.addClass('sport'); 
            a.attr('data-name', sports[i]); 
            a.text(sports[i]); 
            $('#buttonsView').append(a); 
        }
    }

    $('#addSport').on('click', function(){

        var sport = $('#sport-input').val().trim();

        sports.push(sport);
        
        renderButtons();

        $('#sport-input').val('');

        return false;
    })

    $(document).on('click', '.sport', displaySport);

    renderButtons();