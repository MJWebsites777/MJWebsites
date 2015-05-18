onresize=onload=function() {
	var winWidth = $(window).innerWidth();
	var winHeight = $(window).innerHeight();		
	
	$('.monitoring').html("<span class=\"winFocus\">Window Focus: true</span><br />Width: "+winWidth+
		"px<br />Height: "+winHeight+"px<br /><span class=\"ctrlDown\">isCTRLDown: "+isCtrlDown+
		"</span><br /><span class=\"keycode\">KeyCode: "+keyCode+
		"</span><br /><span class=\"lastpage\">Last Page: "+lastPage+
		"</span><br /><span class=\"currentpage\">Current Page: "+currentPage+
		"</span><br /><span class=\"xCoord\">Mouse X: null</span><br /><span class=\"yCoord\">Mouse Y: null</span><br /><span class=\"elemHover\">Mouse Over Element: null</span><br /><span class=\"scrolltop\">ST: null, OS: null</span>");
}

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
			goLeft(function(){
				$('.logo').css('border-radius', '0');
			});
			checkPage();
			break;
		case 38:
		case 87:
			//Up
			break;
		case 39:
		case 68:
			//Right
			goRight(function(){
				$('.logo').css('border-radius', '0');
			});
			checkPage();
			break;
		case 40:
		case 83:
			//Down
			break;
		default:
			break;
	}
});

var translateX = 0;
var logoRotate = 0;
var lastPage = ($('.pageSlider .page').length-1)*-100;
$(document).on("click", ".leftArrow", function() {
	goLeft(function(){
		$('.logo').css('border-radius', '0');
	});
	checkPage();
});
$(document).on("click", ".rightArrow", function() {
	goRight(function(){
		$('.logo').css('border-radius', '0');
	});
	checkPage();
});
	 
$(window).bind("keyup", function(e) {
	keyCode = "UP - "+e.keyCode;
	$('.keycode').html("KeyCode: "+keyCode);
	if (e.keyCode == 17)
		isCtrlDown = false;
	$('.ctrlDown').html("isCTRLDown: "+isCtrlDown);
	var key = e.keyCode;
	switch (key) {
		case 37:
		case 65:
			//if ($('.leftArrow').css("opacity")!="0.25") {$('.leftArrow').css("opacity", "0.5");}
			break;
		case 38:
		case 87:
			//if ($('.upArrow').css("opacity")!="0.25") {$('.upArrow').css("opacity", "0.5");}
			break;
		case 39:
		case 68:
			//if ($('.rightArrow').css("opacity")!="0.25") {$('.rightArrow').css("opacity", "0.5");}
			break;
		case 40:
		case 83:
			//if ($('.downArrow').css("opacity")!="0.25") {$('.downArrow').css("opacity", "0.5");}
			break;
		default:
			break;
	}
});

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
