function checkHash(b) {
	console.log("Checking hash...");
	if (window.location.hash) {
		var hash = window.location.hash.substring(1);
		console.log("Hash = "+hash);
		loadPage(hash);
	}
	else {
		//console.log("Hash is null!");
		if (b == true){
			gotoHome();
		}
	}
}

function loadPage(name) {
	if (name.toLowerCase() == "about" || name.toLowerCase() == "portfolio" || name.toLowerCase() == "contact") {
		/*$(".rollIn").css("animation-play-state", "paused");
		$(".rollIn").css("-webkit-animation-play-state", "paused");*/
	}
	switch (name.toLowerCase()) {
		case "about": console.log("Moving to About..."); gotoAbout(); 
			/*$(".rollAbout").css("animation-play-state", "running");
			$(".rollAbout").css("-webkit-animation-play-state", "running");*/
			break;
		case "portfolio": console.log("Moving to Portfolio..."); gotoPortfolio(); 
			/*$(".rollPortfolio").css("animation-play-state", "running");
			$(".rollPortfolio").css("-webkit-animation-play-state", "running");*/
			break;
		case "contact": console.log("Moving to Contact..."); gotoContact();
			/*$(".rollContact").css("animation-play-state", "running");
			$(".rollContact").css("-webkit-animation-play-state", "running");*/
			break;
		default: history.pushState(null, null, "/"); break;
	}
}

//setTimeout(function(){checkHash();}, 1000);
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
checkPage();
setInterval(function(){ 
	$('.currentpage').html("Current Page: "+currentPage); 
	$('.lastpage').html("Last Page: "+lastPage); 
	if (document.hasFocus()) winFocus = true; 
	else winFocus = false; 
	$('.winFocus').html("Window Focus: "+winFocus); 
}, 10);
var winFocus = true;
var isCtrlDown, disableGoto, pageChanging, portIsScroll = false;
var keyCode, lastPage, prevPage, currentProj = null;
var lastScrollTop = 0;
var currentPage = "Home";
var selectedSort = "allSort";
var isWebkit = /webkit/.test(navigator.userAgent.toLowerCase());

$(document).ready(function(e) {
	console.log(navigator.userAgent);

	window.addEventListener('hashchange', function(){checkHash(true)});

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
					//$('.leftArrow').css("opacity", "1");
					if (currentPage=="Home"){gotoAbout();} else if(currentPage=="About"){return;} else if(currentPage=="Portfolio"){return;} else if(currentPage=="Contact"){gotoHome();};
					break;
				case 38:
				case 87:
					//$('.upArrow').css("opacity", "1");
					if (currentPage=="Portfolio"){gotoHome();} else {return;};
					break;
				case 39:
				case 68:
					//$('.rightArrow').css("opacity", "1");
					if (currentPage=="Home"){gotoContact();} else if(currentPage=="About"){gotoHome()} else {return;};
					break;
				case 40:
				case 83:
					//$('.downArrow').css("opacity", "1");
					if (currentPage=="Home"){gotoPortfolio();} else {return;};
					break;
				default:
					break;
			}
   		 });
		 $(document).on("click", ".leftArrow", function() { if (currentPage=="Home"){gotoAbout();} else if(currentPage=="About"){return;} else if(currentPage=="Portfolio"){return;} else if(currentPage=="Contact"){gotoHome();}; });
		 $(document).on("click", ".rightArrow", function() { if (currentPage=="Home"){gotoContact();} else if(currentPage=="About"){gotoHome()} else {return;}; });
		 
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
});

function gotoHome() {
	if (currentPage != "Home" && !disableGoto) {
		pageChanging = true;
		if (currentPage == "Portfolio") {$('.pageSlider').css('margin-top', '0%');/*$('.renoChanger').css("display", "none");*/}
		setTimeout(function(){history.pushState(null, null, "/");postPageChange(); }, 2000);
		lastPage = prevPage = currentPage;
		$('.upArrow').css({"cursor": "default", "opacity": "0.25"});
				$('.leftArrow').css({"cursor": "pointer", "opacity": "0.75"});
				$('.rightArrow').css({"cursor": "pointer", "opacity": "0.75"});
				$('.downArrow').css({"cursor": "pointer", "opacity": "0.75"});
		$("."+lastPage.toLowerCase()+"Page").css("overflow-y", "hidden");
		$('.pageSlider').attr('class', 'pageSlider').addClass('gotoHomeFrom'+currentPage);
		$('.logo').attr('class', 'logo').addClass('rollHomeFrom'+currentPage);
		//currentPage = "Home";
		//$('.pageSlider').animate({marginLeft: "-"+$(window).innerWidth()+"px", marginTop: "0"});
		$('.gotoHomeFrom'+currentPage).bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function (){
			if (lastPage != "Home") {
				$('.pageSlider').removeClass('gotoHomeFrom'+currentPage);
				//$('.logo').removeClass('rollHomeFrom'+currentPage);
				currentPage = "Home";
				$("."+lastPage.toLowerCase()+"Page").scrollTop(0);
				pageChanging = false;
			}
		});
	}
}
function gotoAbout() {
	if (!disableGoto) {
		prePageChange();
		pageChanging = true;
		//$('title').html("About");
		$('.aboutPage').css("overflow-y", "hidden");
		setTimeout(function(){$('.aboutPage').css("overflow-y", "scroll"); history.pushState(null, null, "#About");postPageChange();}, 2000);
		$('.pageSlider').attr('class', 'pageSlider').addClass('gotoAbout');
		lastPage = currentPage;
		currentPage = "About";
		$('.logo').attr('class', 'logo').addClass('rollAbout');
		$('.rollAbout').bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function (){
			if (lastPage != "About") {
				$('.logo').removeClass('rollAbout');
				pageChanging = false;
			}
		});
	}
}
	
function gotoContact() { 
	if (!disableGoto) {
		prePageChange();
		pageChanging = true;
		//$(".bgText").css("opacity", "0.25");
		setTimeout(function(){history.pushState(null, null, "#Contact");postPageChange(); }, 2000);
		$('.pageSlider').attr('class', 'pageSlider').addClass('gotoContact');
		lastPage = currentPage;
		currentPage = "Contact";
		$('.logo').attr('class', 'logo').addClass('rollContact');
		$('.rollContact').bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function (){
			if (lastPage != "About") {
				$('.logo').removeClass('rollContact');
				pageChanging = false;
			}
		});
	}
}