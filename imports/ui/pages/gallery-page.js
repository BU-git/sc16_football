import './gallery-page.html';

Template.galleryPage.onRendered(function() {
    var $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });
    var filterFns = {};

    $('.filters-link-group').on( 'click', 'a', function() {
        var filterValue = $( this ).attr('data-filter');

        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
    });

    $('.link-group').each( function( i, linkGroup ) {
        var $linkGroup = $( linkGroup );
        $linkGroup.on( 'click', 'a', function() {
            $linkGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
    });
});

