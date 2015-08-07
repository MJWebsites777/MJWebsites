function Pages() {
	var self = this;
	var bgIndex = 0;
	var bg = $('.backgrounds div');
	var pageName = null;
	self.visit = [];
	self.leave = [];

	self.goDown = function(callback){
		if (currentPage == pageCount) return;
		translateY += -100;
		logoRotate += 720;

		if (bgIndex < 3){
	        bg.eq(bgIndex).css('opacity', '');
	        bgIndex++;
	        bg.eq(bgIndex).css('opacity', '1');
	    }

	    prevPage = currentPage;
	    currentPage++;
	    pageName = $('.page').eq(currentPage).attr('class').replace(' page', '');
	    //$('.page').eq(prevPage).find('.content').css('opacity', '0');
	    //$('.page').eq(currentPage).find('.content').css('opacity', '');

		//$('.pageSlider').attr('class', 'pageSlider').addClass('pageRight');
		pages.visit[currentPage]();
		pageChanging = true;
		$('.pageSlider').addClass('pSliderTransformTransition')
		.transform('translateY('+translateY+'vh)')
		.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
		    $(this).off('transitionend webkitTransitionEnd oTransitionEnd')
		    	.attr('class', 'pageSlider');
		    pageChanging = false;
		    pages.leave[prevPage]();
		    if (callback){
		    	callback();
		    }
		});
	};
	self.goUp = function(callback){
		if (currentPage == 0) return;
		translateY += 100;
		logoRotate += -720;

		if (bgIndex > 0){
	        bg.eq(bgIndex).css('opacity', '');
	        bgIndex--;
	        bg.eq(bgIndex).css('opacity', '1');
	    }

	    prevPage = currentPage;
	    currentPage--;
	    pageName = $('.page').eq(currentPage).attr('class').replace(' page', '');
	    //$('.page').eq(prevPage).find('.content').css('opacity', '0');
	    //$('.page').eq(currentPage).find('.content').css('opacity', '');

	 	//$('.pageSlider').attr('class', 'pageSlider').addClass('pageLeft');
	 	pageChanging = true;
	 	$('.pageSlider').addClass('pSliderTransformTransition')
	 	.transform('translateY('+translateY+'vh)')
		.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
		    $(this).off('transitionend webkitTransitionEnd oTransitionEnd')
		    	.attr('class', 'pageSlider');
		    pageChanging = false;
		    if (callback){
		    	callback();
		    }
		});
	};

	self.visit[0] = function(){
		animateDiamonds();
	};
	self.visit[1] = function(){

	};
	self.visit[2] = function(){
	};
	self.visit[3] = function(){
	};

	self.leave[0] = function(){
		$('.diamond').removeClass('anim-diamonds');
	};
	self.leave[1] = function(){
	};
	self.leave[2] = function(){
	};
	self.leave[3] = function(){
	};
}
var pages = new Pages();