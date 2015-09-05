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

function transformPageSlider(id, transform, callback){
	$('.pageSlider').transform(transform)
		.addClass('pageSliderTransition');
		/*.on('transitionend webkitTransitionEnd oTransitionEnd', function(e){
 			$(this).off('transitionend webkitTransitionEnd oTransitionEnd');
 			/*if (e.target !== this){
 				console.log(id+' | child event fired');
 				return;
 			}
 			//e.stopPropagation();
	    	//$(this).attr('class', 'pageSlider');
	    	console.log(id+' | transitionend');
		});*/
	setTimeout(function(){
		$('.pageSlider').removeClass('pageSliderTransition');
		$(this).attr('class', 'pageSlider');
    	if (callback){
	    	callback(id);
	    }
	}, 1600);
}

var idArray = [];
function generateID(){
	var id = '';
	for (var x=0;x<5;x++){
		id+=''+Math.floor((Math.random() * 10));
	}
	if (idArray.indexOf(id) !== -1){
		return generateID();
	}
	return id;
}