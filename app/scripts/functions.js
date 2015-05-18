function goLeft(callback){
	if (translateX == 0) return;
	translateX += 100;
	logoRotate += -720;
	$('.logo').attr('class', 'logo')/*.addClass('rollLeft')*/;
	$('.logo').css({'transform': 'rotate('+logoRotate+'deg)', 'border-radius': '80px'});
 	//$('.pageSlider').attr('class', 'pageSlider').addClass('pageLeft');
 	$('.pageSlider').css({
	  '-webkit-transform' : 'translateX('+translateX+'vw)',
	  '-moz-transform'    : 'translateX('+translateX+'vw)',
	  '-ms-transform'     : 'translateX('+translateX+'vw)',
	  '-o-transform'      : 'translateX('+translateX+'vw)',
	  'transform'         : 'translateX('+translateX+'vw)'
	})
	.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
	    $(this).off('transitionend webkitTransitionEnd oTransitionEnd');
	    if (callback){
	    	callback();
	    }
	});
}

function goRight(callback){
	if (translateX == lastPage) return;
	translateX += -100;
	logoRotate += 720;
	$('.logo').attr('class', 'logo')/*.addClass('rollRight')*/;
	$('.logo').css({'transform': 'rotate('+logoRotate+'deg)', 'border-radius': '80px'});
	//$('.pageSlider').attr('class', 'pageSlider').addClass('pageRight');
	$('.pageSlider').css({
	  '-webkit-transform' : 'translateX('+translateX+'vw)',
	  '-moz-transform'    : 'translateX('+translateX+'vw)',
	  '-ms-transform'     : 'translateX('+translateX+'vw)',
	  '-o-transform'      : 'translateX('+translateX+'vw)',
	  'transform'         : 'translateX('+translateX+'vw)'
	})
	.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
	    $(this).off('transitionend webkitTransitionEnd oTransitionEnd');
	    if (callback){
	    	callback();
	    }
	});

}

function checkPage(){
	if (translateX == 0){
		$('.goLeft').css('opacity', '0');
		$('.goRight').css('display', '');
		setTimeout(function(){
			$('.goRight').css('opacity', '');
		}, 50);
		setTimeout(function(){
			$('.goLeft').css('display', 'none');
		}, 500);
	}
	else if (translateX == lastPage){
		$('.goRight').css('opacity', '0');
		$('.goLeft').css('display', '');
		setTimeout(function(){
			$('.goLeft').css('opacity', '');
		}, 50);
		setTimeout(function(){
			$('.goRight').css('display', 'none');
		}, 500);
	}
	else {
		$('.goRight').css('display', '');
		$('.goLeft').css('display', '');
		setTimeout(function(){
			$('.goRight').css('opacity', '');
			$('.goLeft').css('opacity', '');
		}, 50);
	}
}