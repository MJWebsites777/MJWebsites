/*
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
*/

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
			//Left			
			break;
		case 38:
			//Up
			pages.goUp();
			break;
		case 39:
			//Right
			break;
		case 40:
			//Down
			pages.goDown();
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
	pages.goUp();
});
$(document).on("click", ".goDown", function() {
	if (pageChanging) return;
	pages.goDown();
});

// Visit site button click event
$(document).on('click', '.visitBtn', function(){
	window.open($(this).data('href'), '_blank');
});

// Thumbnail click event
$(document).on('click', '.thumbnail', function(){
	var t = $(this);
	var index = t.index();
	var preview = t.parent('.thumbnails').siblings('.preview');
	if (t.index === preview.children('.active').index()) {return;}
	if (index === 0) {
		preview.children('.projImage').eq(1).removeClass('active');
		preview.children('.projImage').eq(index).addClass('active');
	}
	else {
		preview.children('.projImage').eq(0).removeClass('active');
		preview.children('.projImage').eq(index).addClass('active');
	}
	t.parent('.thumbnails').children('.thumbnail').removeClass('active');
	t.addClass('active');
});
	 
// Mouse scroll event
var i = 0;
$('.pageSlider').on('DOMMouseScroll mousewheel', function(e){
	//console.log('Scroll | PageChanging = '+pageChanging);
	e.preventDefault();
	if (pageChanging || siteLoading) return;
	//var delta = 0;
	var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);
	i === idArray.length-1 ? i=0 : i++;
	var id = generateID();
	//console.log(id+' | delta: '+delta);
	if (delta<0) pages.goDown(id); else pages.goUp(id);
});

// Animate towers when mouse hovers over logo
$('.logo').hover(function() {
	$('.tower').addClass('towerPre');
}, function() {
	$('.tower').removeClass('towerPre');
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