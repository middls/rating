
$(document).ready(function(){
    $('.spoiler-body').hide();
    $('.spoiler-title').click(function(){
        $(this).toggleClass('opened').toggleClass('closed').next().slideToggle();
        if($(this).hasClass('opened')) {
        }
    });
});

$(function() {

	$('.btn-catalog').on('click', function() {
		$()
		return false
	})

	$('.btn-catalog').on('click', function() {
		$('.inside-catalog').slideToggle('fast')
		return false
	})


	$('.btn-menu').on('click', function() {
		$('.menu-catalog').addClass('active')
		$('html').css({ overflowY: 'hidden' })
		return false
	})

	$('.btn-filter').on('click', function() {
		$('.filtermenu').addClass('active')
		$('html').css({ overflowY: 'hidden' })
		return false
	})

	$('.menu-catalog-head').on('click', function() {
		$('.menu-catalog').removeClass('active')
		$('html').css({ overflowY: 'inherit' })
		return false
	})
	
    $('.filtermenu-head').on('click', function() {
    	$('.filtermenu').removeClass('active')
		$('html').css({ overflowY: 'inherit' })
    	return false
    })

	$('.modal').on('show.bs.modal', function (e) {
		$(this).find('select').selectmenu()
	})

	$('.btn-up').click(function() {
	    $('html, body').animate({scrollTop: 0},500);
	    return false;
	})

})