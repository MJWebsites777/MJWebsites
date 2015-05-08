var winFocus = true;
var isCtrlDown, disableGoto, pageChanging, portIsScroll = false;
var keyCode, lastPage, prevPage, currentProj = null;
var currentPage = "Home";

$(document).ready(function(e) {
	console.log(navigator.userAgent);

	var spanCount = 0;
	var interval = setInterval(function(){
		if (spanCount < $('.title span').length){
			$('.title span').eq(spanCount).css('opacity', '1');
			spanCount++;
		}
		else {
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