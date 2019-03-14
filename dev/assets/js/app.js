$(function() {


	$('.btn-menu').on('click', function() {
		$('.menu-catalog').addClass('active')
		$('html').css({ overflowY: 'hidden' })
		return false
	})

	$('.menu-catalog-head').on('click', function() {
		$('.menu-catalog').removeClass('active')
		$('html').css({ overflowY: 'inherit' })
		return false
	})

})