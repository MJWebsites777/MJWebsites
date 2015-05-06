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
setTimeout(function(){ $('.title').animate({ opacity: "1" }, 500, function(){ /*$('.logo').removeClass('rollIn');*/ $('.nav').animate({ opacity: "1" }, 500, function(){
	$('.aboutPage, .portfolioPage, .contactPage').css("opacity", "1");
	checkHash();
	$('.nav span').hover(function(){
			$(".bgtSlide").css("animation-play-state", "running");
			$('.bgtSlide').css("-webkit-animation-play-state", "running"); 
			$('.bgText').animate({ opacity: "0.25" }, {queue: false});
			var bgth = $('.bgText h1').innerHeight() / 2;
			//var bgtw = $('.bgText h1').innerWidth() / 2;
			$(".bgText h1").css({"margin-top": "-"+bgth+"px"/*, "margin-left": "-"+bgtw+"px"*/});
		}, function(){
			if (!pageChanging){
				$('.bgText').animate({ opacity: "0" }, {queue: false}, 500, function(){
					//$(".bgtSlide").css("animation-play-state", "paused");
					//$(".bgtSlide").css("-webkit-animation-play-state", "paused");
				});
			}
	});
}); }); }, 1000);
checkPage();
setInterval(function(){ $('.currentpage').html("Current Page: "+currentPage); $('.lastpage').html("Last Page: "+lastPage); if (document.hasFocus()) winFocus = true; else winFocus = false; $('.winFocus').html("Window Focus: "+winFocus); checkPage(); }, 10);
var winFocus = true;
var isCtrlDown, disableGoto, pageChanging, portIsScroll = false;
var keyCode, lastPage, prevPage, currentProj = null;
var lastScrollTop = 0;
var currentPage = "Home";
var selectedSort = "allSort";
var isWebkit = /webkit/.test(navigator.userAgent.toLowerCase());
//$(".pageSlider").wrap("<a href='javascript:void(0);'onclick='return false;'></a>");
$('.bgtSlide').css("-webkit-animation-play-state", "paused"); 
$('.bgtSlide').css("animation-play-state", "paused"); 

$(document).ready(function(e) {
	console.log(navigator.userAgent);

	window.addEventListener('hashchange', function(){checkHash(true)});
	
	//$('.aboutPage').jScrollPane();
	//$('.aboutPage').css("overflow-y", "scroll");
	//$('.portfolioPage').css("overflow-y", "scroll");

	onresize=onload=function() {
		var winWidth = $(window).innerWidth();
		var winHeight = $(window).innerHeight();
		if (!isCtrlDown) {
			$(".nav span").css("font-size", winWidth/45+"px");
			$(".bgText h1").css("font-size", winWidth/7+"px");	
			$('.pageSlider').css("width", winWidth*3+"px");
			$('.pageSlider').css("height", winHeight*2+"px");
			$(".pageSlider").css("margin-left", "-"+winWidth+"px");
			$(".page").css("height", winHeight+"px");
			$('.portSort').css("margin-left", "-"+$('.portSort').innerWidth()/2+"px");
			$('.reno').css("height", $('.reno img').height()+"px")/*.width($('.reno img').width())*/;
			//$('.renoChanger').css('height', $('.reno img').height()+"px");
			//$('.reno').animate({height: $('.reno img').height()+"px" }, 300);
			$('.portBox').css("margin-left", "-"+$('.portBox').innerWidth()/2+"px");
			//$('.homePage').css("margin-left", "-"+$('.homePage').innerWidth()/2+"px");
			if (currentPage=="Portfolio") { /*console.log("Changing Portfolio Height!");*/ $('.pageSlider').css("margin-top", "-"+$(window).height()+"px");}
		}		
		
		$('.monitoring').html("<span class=\"winFocus\">Window Focus: true</span><br />Width: "+winWidth+"px<br />Height: "+winHeight+"px<br /><span class=\"ctrlDown\">isCTRLDown: "+isCtrlDown+"</span><br /><span class=\"keycode\">KeyCode: "+keyCode+"</span><br /><span class=\"lastpage\">Last Page: "+lastPage+"</span><br /><span class=\"currentpage\">Current Page: "+currentPage+"</span><br /><span class=\"xCoord\">Mouse X: null</span><br /><span class=\"yCoord\">Mouse Y: null</span><br /><span class=\"elemHover\">Mouse Over Element: null</span><br /><span class=\"scrolltop\">ST: null, OS: null</span>");
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
		 $(document).on("click", ".downArrow", function() { if (currentPage=="Home"){gotoPortfolio();} else {return;}; });
		 $(document).on("click", ".rightArrow", function() { if (currentPage=="Home"){gotoContact();} else if(currentPage=="About"){gotoHome()} else {return;}; });
		 $(document).on("click", ".upArrow", function() { if (currentPage=="Portfolio"){gotoHome();} else {return;};  });
		 
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
	
	$('.nav span').mouseenter(function(){if($('.bgText').hasClass('bgtSlide') == false) {$('.bgText').addClass('bgtSlide');}});
	$('.about').mouseenter(function(){$(".bgText h1").html("ABOUT")});
	$('.portfolio').mouseenter(function(){$(".bgText h1").html("PORTFOLIO")});
	$('.contact').mouseenter(function(){$(".bgText h1").html("CONTACT")});
	$('.arrows div').hover(function(){ var t = $(this); if (t.css("opacity") != "0.25") {t.css("opacity", "1");}}, function(){var t = $(this); if (t.css("opacity") != "0.25") {t.css("opacity", "0.75");}});
	
	$('.xpDiv').hover(function(){ //In
		var t = $(this).children('.xpDesc');
		if (!t.hasClass('animated')) {
			t.dequeue().stop().slideDown(250);
		}
		//$(this).children('.xpDesc').removeClass('xpDescSlideUp').addClass('xpDescSlideDown');
	}, function(){ //Out
		var t = $(this).children('.xpDesc');
		t.addClass('animated').slideUp(250, function(){
			t.removeClass('animated').dequeue();
		});
		//$(this).children('.xpDesc').removeClass('xpDescSlideDown').addClass('xpDescSlideUp');
	});
	
	$(document).on("click", '.nav span', function() { 
		$('.bgtSlide').css("-webkit-animation-play-state", "paused"); 
		$('.bgtSlide').css("animation-play-state", "paused"); 
	});
	$(document).on("click", ".about", function() { gotoAbout(); });
	$(document).on("click", ".portfolio", function() { gotoPortfolio(); });
		$(document).on("click", ".portSort span", function() { $(".portSort span").css({"background-color": "#fff", "color": "#004266"}); $(this).css({"background-color": "#0073b3", "color": "#fff"}); selectedSort = $(this).attr('class');});
	$(document).on("click", ".contact", function() { gotoContact(); });
	$(document).on("click", ".logo", function() { gotoHome();  });
	
	$('.portfolioPage').bind('mousewheel DOMMouseScroll', function(e){
		e.preventDefault();
		if (portIsScroll) return;
		var delta = 0;
		if (e.type == 'mousewheel') {
        	delta = e.originalEvent.wheelDelta;
			console.log("w"+delta);
			if (delta<0) scrollPortDown(); else scrollPortUp();
    	}
    	else if (e.type == 'DOMMouseScroll') {
        	delta = e.originalEvent.detail;
			console.log("d"+delta);
			if (delta>0) scrollPortDown(); else scrollPortUp();
    	}
		
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
var projCount = 0;
function gotoPortfolio() {
	if (!disableGoto) {
		if (projCount==0) $('.proj').each(function(i, e) {projCount++});
		console.log("projCount: "+projCount);
		prePageChange();
		pageChanging = true;
		$('.portfolioPage').css("overflow-y", "hidden");
		var width1 = $(".portfolioPage").width(); console.log(width1);
		//$('.allSort').css({"background-color": "#0073b3", "color": "#FFF"});
		$('.portSort').css("margin-left", "-417px");
		setTimeout(function(){
			$('.portfolioPage').css("overflow-y", "scroll");
			var width2 = $(".portfolioPage").width(); console.log(width2);
			$('.portSort').css("margin-left", "-="+(width1-width2)+"px");
			history.pushState(null, null, "#Portfolio");
			postPageChange(); 
			
		}, 2000);
		$('.pageSlider').attr('class', 'pageSlider').addClass('gotoPortfolio');
		lastPage = currentPage;
		currentPage = "Portfolio";
		$('.logo').attr('class', 'logo').addClass('rollPortfolio');
	
		$('.rollPortfolio').bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function (){
			if (lastPage != "Portfolio" && currentPage == "Portfolio") {
				$('.pageSlider').removeClass('gotoPortfolio')/*.css('-webkit-transform', 'translateY(50%)')*/.css("margin-top", "-"+$(window).height()+"px");
				pageChanging = false;
				//$('.renoChanger').css("display", "block");
			}
		});
	}
}
	function scrollPortDown(){
		if (currentProj == null || currentProj == 0){
			portIsScroll = true;
			currentProj = 1;
			if (currentProj > projCount) return;
			var offset = Math.ceil($('.proj:nth-child('+currentProj+')').offset().top);
			console.log(offset);
			offset = offset-110;
			console.log(offset);
			$('.portfolioPage').animate({scrollTop: "+="+offset+"px"}, {duration:700, easing:'swing'}).promise().done(function(){setTimeout(function(){portIsScroll = false;lastScrollTop = $('.portfolioPage').scrollTop();console.log("port is not scrolling")},50)});
		}
		else {
			portIsScroll = true;
			currentProj += 1;
			if (currentProj > projCount) { currentProj -= 1;portIsScroll = false; return; }
			var offset = Math.ceil($('.proj:nth-child('+currentProj+')').offset().top);
			console.log(offset);
			offset = offset-110;
			console.log("else");
			if (currentProj == projCount) offset = offset+0.5;
			console.log(offset);
			$('.portfolioPage').animate({scrollTop: "+="+offset+"px"}, {duration:700, easing:'swing'}).promise().done(function(){setTimeout(function(){portIsScroll = false;lastScrollTop = $('.portfolioPage').scrollTop();console.log("port is not scrolling")},50)});
		}
	}
	function scrollPortUp(callback){
		if (currentProj == null) return;
		currentProj -= 1;
		console.log(currentProj);
		if (currentProj < 0) { currentProj += 1; return;}
		else if (currentProj == 0) { portIsScroll = true;$('.portfolioPage').animate({scrollTop: "0px"}, {duration:700, easing:'swing'}).promise().done(function(){setTimeout(function(){portIsScroll = false;lastScrollTop = $('.portfolioPage').scrollTop();console.log("port is not scrolling")},50)});}
		else {
			portIsScroll = true;
			var offset = Math.ceil($('.reno:nth-child('+currentProj+')').offset().top);
			console.log(offset);
			offset = offset-110;
			console.log(offset);
			//$('.portfolioPage').animate({scrollTop: "-="+offset+"px"}, 500);
			$('.portfolioPage').animate({scrollTop: "+="+offset+"px"}, {duration:700, easing:'swing'}).promise().done(function(){setTimeout(function(){portIsScroll = false;lastScrollTop = $('.portfolioPage').scrollTop();console.log("port is not scrolling")},50)});
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

function prePageChange() {
	//$('.nav span').css("-webkit-animation-play-state", "paused"); 
	//$('.nav span').css("animation-play-state", "paused"); 
}
function postPageChange() {
	$(".bgText").css("opacity", "0");
	//$('.nav span').css("-webkit-animation-play-state", "running"); 
	//$('.nav span').css("animation-play-state", "running");
}

function checkPage() {
	if (prevPage != currentPage && !disableGoto) {
		switch (currentPage) {
			case "Home":
				$('.upArrow').css({"cursor": "default", "opacity": "0.25"});
				$('.leftArrow').css({"cursor": "pointer", "opacity": "0.75"});
				$('.rightArrow').css({"cursor": "pointer", "opacity": "0.75"});
				$('.downArrow').css({"cursor": "pointer", "opacity": "0.75"});
				break;
			case "About":
				$('.leftArrow').css({"cursor": "default", "opacity": "0.25"});
				$('.upArrow').css({"cursor": "default", "opacity": "0.25"});
				$('.rightArrow').css({"cursor": "pointer", "opacity": "0.75"});
				$('.downArrow').css({"cursor": "default", "opacity": "0.25"});
				break;
			case "Portfolio":
				$('.downArrow').css({"cursor": "default", "opacity": "0.25"});
				$('.leftArrow').css({"cursor": "default", "opacity": "0.25"});
				$('.rightArrow').css({"cursor": "default", "opacity": "0.25"});
				$('.upArrow').css({"cursor": "pointer", "opacity": "0.75"});
				break;
			case "Contact":
				$('.rightArrow').css({"cursor": "default", "opacity": "0.25"});
				$('.upArrow').css({"cursor": "default", "opacity": "0.25"});
				$('.downArrow').css({"cursor": "default", "opacity": "0.25"});
				$('.leftArrow').css({"cursor": "pointer", "opacity": "0.75"});
				break;
			default:
				break;
		}
		prevPage = currentPage;
	}
}