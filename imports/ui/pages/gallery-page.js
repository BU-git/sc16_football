import './gallery-page.html';

Template.galleryPage.onRendered(function() {
	$('.card').fancybox();
});