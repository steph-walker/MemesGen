$(function () {
    var $memesContainer = $('.memes-container')
    var memesTemplate = $('#meme-template').html()

    function addPhoto(meme) {
        $memesContainer.append(Mustache.render(memesTemplate, meme))
    }

    // Get top 100 meme from imgflip api
    $.ajax({
        type: 'GET',
        url: 'https://makeopensourcegreatagain.com/memegen/api/?table_name=memegen',
        dataType: 'json',
        success: function (response) {
            $.each(response.rows, function (i, meme) {
                addPhoto(meme)
            })

            // Intialize masonry grid image
            var $grid = $('.grid').masonry({
                itemSelector: '.grid-item',
                percentPosition: true,
                columnWidth: '.grid-sizer'
            });
            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
        },
        error: function () {
            showAlert("An error occurred while loading images, try again later.")
        }
    })
})