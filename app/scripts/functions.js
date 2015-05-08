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