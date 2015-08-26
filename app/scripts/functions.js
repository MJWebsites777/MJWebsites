function checkPage(){
	if (currentPage == 0){
		$('.goUp').css('opacity', '0');
		$('.goDown').css('display', '');
		setTimeout(function(){
			$('.goDown').css('opacity', '');
		}, 50);
		setTimeout(function(){
			$('.goUp').css('display', 'none');
		}, 700);
	}
	else if (currentPage == (pageCount-1)){
		$('.goDown').css('opacity', '0');
		$('.goUp').css('display', '');
		setTimeout(function(){
			$('.goUp').css('opacity', '');
		}, 50);
		setTimeout(function(){
			$('.goDown').css('display', 'none');
		}, 700);
	}
	else {
		$('.goDown').css('display', '');
		$('.goUp').css('display', '');
		setTimeout(function(){
			$('.goDown').css('opacity', '');
			$('.goUp').css('opacity', '');
		}, 50);
	}

	$('.currentPage').html("Current Page: "+currentPage); 
}

function animateDiamonds(){
	var i = 0;
	var diaCount = $('.diamond').length;
	var interval = setInterval(function(){
	    if (i < diaCount){
	      $('.diamond').eq(i).addClass('anim-diamond');
	      i++;
	    }
	    else {
	      clearInterval(interval);
	    }
	}, 1000);
}

function transformPageSlider(transform, callback){
	$('.pageSlider').addClass('pSliderTransformTransition')
 		.transform(transform)
 		.one('transitionend webkitTransitionEnd oTransitionEnd', function () {
	    	$(this).attr('class', 'pageSlider');
	    	if (callback){
		    	callback();
		    }
		});
}

(function($) { 
	$.fn.transform = function(rule) {
		return this.each( function() {
			$(this).css({
			  '-webkit-transform' : rule,
			  '-moz-transform'    : rule,
			  '-ms-transform'     : rule,
			  '-o-transform'      : rule,
			  'transform'         : rule
			});
		});
	}
}(jQuery));