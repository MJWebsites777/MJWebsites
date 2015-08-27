// Browser reload/resize event
onresize=onload=function() {
	var winWidth = $(window).innerWidth();
	var winHeight = $(window).innerHeight();		
	
	$('.monitoring').html("<span class=\"winFocus\">Window Focus: true</span><br />Width: "+winWidth+
		"px<br />Height: "+winHeight+"px<br /><span class=\"ctrlDown\">isCTRLDown: "+isCtrlDown+
		"</span><br /><span class=\"keycode\">KeyCode: "+keyCode+
		"</span><br /><span class=\"mouseclick\">MouseClick: "+
		"</span><br /><span class=\"pageCount\">Page Count: "+pageCount+
		"</span><br /><span class=\"currentPage\">Current Page: "+currentPage+
		"</span><br /><span class=\"xCoord\">Mouse X: null</span><br />"+
		"<span class=\"yCoord\">Mouse Y: null</span><br />"+
		"<span class=\"elemHover\">Mouse Over Element: null</span><br />"+
		"<span class=\"scrolltop\">ST: null, OS: null</span>");
}

// Key down event
$(window).bind("keydown", function(e) {
	keyCode = "DOWN - "+e.keyCode;
	$('.keycode').html("KeyCode: "+keyCode);
	if (e.keyCode == 17)
		isCtrlDown = true;
	$('.ctrlDown').html("isCTRLDown: "+isCtrlDown);
	
	/*Keycodes:
		Left: 37, Up: 38, Right: 39, Down: 40
		A: 65   , W: 87 , D: 68    , S: 83
	*/
	var key = e.keyCode;
	switch (key) {
		case 37:
		case 65:
			//Left			
			break;
		case 38:
		case 87:
			//Up
			pages.goUp(function(){
				$('.logo').css('border-radius', '0');
			});
			break;
		case 39:
		case 68:
			//Right
			break;
		case 40:
		case 83:
			//Down
			pages.goDown(function(){
				$('.logo').css('border-radius', '0');
			});
			break;
		default:
			break;
	}
});
// Key up event
$(window).bind("keyup", function(e) {
	keyCode = "UP - "+e.keyCode;
	$('.keycode').html("KeyCode: "+keyCode);
	if (e.keyCode == 17)
		isCtrlDown = false;
	$('.ctrlDown').html("isCTRLDown: "+isCtrlDown);
});

// Arrow click event
var translateY = 0;
var logoRotate = 0;
$(document).on("click", ".goUp", function() {
	if (pageChanging) return;
	pages.goUp(function(){
		//$('.logo').css('border-radius', '0');
	});
});
$(document).on("click", ".goDown", function() {
	if (pageChanging) return;
	pages.goDown(function(){
		//$('.logo').css('border-radius', '0');
	});
});
	 
// Mouse scroll event
$('.pageSlider').on('DOMMouseScroll mousewheel', function(e){
	e.preventDefault();
	if (pageChanging || siteLoading) return;
	//var delta = 0;
	var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);
	//console.log('delta: '+delta);
	if (delta<0) pages.goDown(); else pages.goUp();
});

// Mouse move event
$('html').on("mousemove", function(e) {
	var x=e.clientX;
	var y=e.clientY;
	var xPercent = ((x/window.innerWidth) * 100).toFixed(0);
	var yPercent = ((y/window.innerHeight) * 100).toFixed(0);
	$('.xCoord').html("Mouse X: "+x+"px ("+xPercent+"%)");
	$('.yCoord').html("Mouse Y: "+y+"px ("+yPercent+"%)");
	var elemHover = document.elementFromPoint(x, y);
	$('.elemHover').html("Mouse Over Element: "+$(elemHover).attr('class'));
});

// Mouse Button Click
$(document).on('mousedown', 'html', function(e){
	switch (e.which){
		case 1:
			$('.mouseclick').html("MouseClick: Left");
			break;
		case 2:
			$('.mouseclick').html("MouseClick: Scroll");
			e.preventDefault();
			break;
		case 3:
			$('.mouseclick').html("MouseClick: Right");
			break;
		default:
			$('.mouseclick').html("MouseClick: Unknown");
			break;
	}
});