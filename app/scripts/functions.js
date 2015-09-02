// Custom jQuery functions
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

(function($) { 
	$.fn.opacity = function(rule) {
		return this.each( function() {
			$(this).css('opacity', rule);
		});
	}
}(jQuery));

// Other functions
function checkPage(){
	if (currentPage == 0){
		$('.goUp').opacity(0);
		$('.goDown').css('display', '');
		setTimeout(function(){
			$('.goDown').opacity('');
		}, 50);
		setTimeout(function(){
			$('.goUp').css('display', 'none');
		}, 700);
	}
	else if (currentPage == (pageCount-1)){
		$('.goDown').opacity(0);
		$('.goUp').css('display', '');
		setTimeout(function(){
			$('.goUp').opacity('');
		}, 50);
		setTimeout(function(){
			$('.goDown').css('display', 'none');
		}, 700);
	}
	else {
		$('.goDown').css('display', '');
		$('.goUp').css('display', '');
		setTimeout(function(){
			$('.goDown').opacity('');
			$('.goUp').opacity('');
		}, 50);
	}

	$('.currentPage').html("Current Page: "+currentPage); 
}

function transformPageSlider(transform, callback){
	$('.pageSlider').transform(transform)
 		.one('transitionend webkitTransitionEnd oTransitionEnd', function () {
	    	$(this).attr('class', 'pageSlider');
	    	if (callback){
		    	callback();
		    }
		});
}