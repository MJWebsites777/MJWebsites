var winFocus = true;
var isCtrlDown, disableGoto, pageChanging, portIsScroll = false;
var keyCode, lastPage, prevPage, currentProj = null;
var currentPage = "Home";

$(document).ready(function(e) {
	$('.scroller').niceScroll({
		autohidemode: 'leave',
		railoffset: {top:0, left:15}
	});

	console.log(navigator.userAgent);
	$('.logo').attr('class', 'logo').addClass('rollIn');

	setTimeout(function(){
		$('.logo').css('border-radius', '0');
	}, 1000);

	var spanCount = 0;
	var interval = setInterval(function(){
		if (spanCount < $('.title span').length){
			$('.title span').eq(spanCount).css('opacity', '1');
			spanCount++;
		}
		else {
			$('.goRight').css('display', '');
			setTimeout(function(){
				$('.goRight').css('opacity', '').addClass('arrowFlash');
				setTimeout(function(){
					$('.goRight').attr('class', 'goRight');
				}, 800);
			}, 50);
			clearInterval(interval);
		}
	}, 1500);
	setInterval(function(){ 
		$('.currentpage').html("Current Page: "+currentPage); 
		$('.lastpage').html("Last Page: "+lastPage); 
		if (document.hasFocus()) winFocus = true; 
		else winFocus = false; 
		$('.winFocus').html("Window Focus: "+winFocus); 
	}, 10);
});