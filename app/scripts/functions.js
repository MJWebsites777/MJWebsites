var bgIndex = 0;
var bg = $('.backgrounds div');
function goUp(callback){
	if (translateY == 0) return;
	translateY += 100;
	logoRotate += -720;
	$('.logo').attr('class', 'logo')/*.addClass('rollLeft')*/;
	if (translateY === 0){
		$('.logo').transform('');
	}

	if (bgIndex > 0){
        bg.eq(bgIndex).css('opacity', '');
        bgIndex--;
        bg.eq(bgIndex).css('opacity', '1');
    }

 	//$('.pageSlider').attr('class', 'pageSlider').addClass('pageLeft');
 	pageChanging = true;
 	$('.pageSlider').addClass('pSliderTransformTransition')
 	.transform('translateY('+translateY+'vh)')
	.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
	    $(this).off('transitionend webkitTransitionEnd oTransitionEnd')
	    	.attr('class', 'pageSlider');
	    pageChanging = false;
	    if (callback){
	    	callback();
	    }
	});
}

function goDown(callback){
	if (translateY == lastPage) return;
	translateY += -100;
	logoRotate += 720;
	$('.logo').attr('class', 'logo')/*.addClass('rollRight')*/;
	if (translateY === -100){
		$('.logo').transform('rotate(45deg) scale(0.75)');
	}

	if (bgIndex < 2){
        bg.eq(bgIndex).css('opacity', '');
        bgIndex++;
        bg.eq(bgIndex).css('opacity', '1');
    }

	//$('.pageSlider').attr('class', 'pageSlider').addClass('pageRight');
	pageChanging = true;
	$('.pageSlider').addClass('pSliderTransformTransition')
	.transform('translateY('+translateY+'vh)')
	.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
	    $(this).off('transitionend webkitTransitionEnd oTransitionEnd')
	    	.attr('class', 'pageSlider');
	    pageChanging = false;
	    if (callback){
	    	callback();
	    }
	});

}

function checkPage(){
	if (translateY == 0){
		$('.goUp').css('opacity', '0');
		$('.goDown').css('display', '');
		setTimeout(function(){
			$('.goDown').css('opacity', '');
		}, 50);
		setTimeout(function(){
			$('.goUp').css('display', 'none');
		}, 500);
	}
	else if (translateY == lastPage){
		$('.goDown').css('opacity', '0');
		$('.goUp').css('display', '');
		setTimeout(function(){
			$('.goUp').css('opacity', '');
		}, 50);
		setTimeout(function(){
			$('.goDown').css('display', 'none');
		}, 500);
	}
	else {
		$('.goDown').css('display', '');
		$('.goUp').css('display', '');
		setTimeout(function(){
			$('.goDown').css('opacity', '');
			$('.goUp').css('opacity', '');
		}, 50);
	}
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