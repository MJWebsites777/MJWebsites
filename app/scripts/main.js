$(document).ready(function(e) {
	/*$('.scroller').niceScroll({
		autohidemode: 'leave',
		railoffset: {top:0, left:15}
	});*/

	console.log(navigator.userAgent);

	$('.homePage .logo').opacity('');
	setTimeout(function(){
		$('.homePage .tower').removeClass('towerPre');
	}, 500);

	var spanCount = 0;
	var homeSpans = $('.homePage .content span');
	var interval = setInterval(function(){
		if (spanCount < homeSpans.length){
			homeSpans.eq(spanCount).opacity(1);
			spanCount++;
		}
		else {
			$('.goDown').css('display', '');
			setTimeout(function(){
				$('.goDown').opacity('').addClass('arrowFlash');
				setTimeout(function(){
					$('.goDown').attr('class', 'goDown');
					siteLoading = false;
				}, 800);
			}, 50);
			clearInterval(interval);
		}
	}, 1000);

	setInterval(function(){ 
		$('.currentPage').html("Current Page: "+currentPage); 
		$('.pageCount').html("Page Count: "+pageCount); 
		if (document.hasFocus()) winFocus = true; 
		else winFocus = false; 
		$('.winFocus').html("Window Focus: "+winFocus); 
	}, 10);
});