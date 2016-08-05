import './gallery-page.html';
import { Template } from 'meteor/templating';

var $grid;

Template.galleryPage.onRendered(function() {
    $grid = $('.gallery').isotope({
        itemSelector: '.gallery__item',
        layoutMode: 'fitRows'
    });
});

Template.galleryPage.events({
    'click .filter a': function(e){
        e.preventDefault();
        var filterValue = $(e.target).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        $('.filter').find('.is-checked').removeClass('is-checked');
        $(e.target).addClass('is-checked')
    }
})
