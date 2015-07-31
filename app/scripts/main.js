var winFocus = true;
var isCtrlDown, disableGoto, pageChanging, portIsScroll = false;
var keyCode, lastPage, prevPage, currentProj = null;
var currentPage = "Home";

$(document).ready(function(e) {
	/*$('.scroller').niceScroll({
		autohidemode: 'leave',
		railoffset: {top:0, left:15}
	});*/

	console.log(navigator.userAgent);
	setTimeout(function(){$('.logo').removeClass('logoPre');}, 10);

	var spanCount = 0;
	var homeSpans = $('.homePage .content span');
	var interval = setInterval(function(){
		if (spanCount < homeSpans.length){
			homeSpans.eq(spanCount).css('opacity', '1');
			spanCount++;
		}
		else {
			$('.goDown').css('display', '');
			setTimeout(function(){
				$('.goDown').css('opacity', '').addClass('arrowFlash');
				setTimeout(function(){
					$('.goDown').attr('class', 'goDown');
				}, 800);
			}, 50);
			clearInterval(interval);
		}
	}, 1000);
	setInterval(function(){ 
		$('.currentpage').html("Current Page: "+currentPage); 
		$('.lastpage').html("Last Page: "+lastPage); 
		if (document.hasFocus()) winFocus = true; 
		else winFocus = false; 
		$('.winFocus').html("Window Focus: "+winFocus); 
	}, 10);
});