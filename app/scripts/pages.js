function Pages() {
	var self = this;
	var bgIndex = 0;
	var bg = $('.backgrounds div');
	var pageName = null;

	self.goDown = function(callback){
		if (currentPage == (pageCount-1) || viewingProject) return;
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
	    checkPage();
	    //$('.page').eq(prevPage).find('.content').css('opacity', '0');
	    //$('.page').eq(currentPage).find('.content').css('opacity', '');

		//$('.pageSlider').attr('class', 'pageSlider').addClass('pageRight');
		pageChanging = true;
		transformPageSlider('translateY('+translateY+'vh)', function(){
	 		pageChanging = false;
		    self.visit[currentPage]();
		    self.leave[prevPage]();
		    if (callback){
		    	callback();
		    }
	 	});
	};
	self.goUp = function(callback){
		if (currentPage == 0 || viewingProject) return;
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
	    checkPage();
	    //$('.page').eq(prevPage).find('.content').css('opacity', '0');
	    //$('.page').eq(currentPage).find('.content').css('opacity', '');

	 	//$('.pageSlider').attr('class', 'pageSlider').addClass('pageLeft');
	 	pageChanging = true;
	 	transformPageSlider('translateY('+translateY+'vh)', function(){
	 		pageChanging = false;
		    self.visit[currentPage]();
		    self.leave[prevPage]();
		    if (callback){
		    	callback();
		    }
	 	});
	};
	self.goRight = function(callback) {
		transformPageSlider('translateY('+translateY+'vh)', callback);

	};
	self.goLeft = function(callback) {
		transformPageSlider('translateY('+translateY+'vh) translateX(100vw)', callback);
	};

	self.visit = {
		0: function(){ // Home Page
			animateDiamonds();
		},
		1: function(){ // Portfolio Page
			
			$('.portfolioPage .content').css('opacity', '');
		},
		2: function(){ // About Page
			return;
		},	
		3: function(){ // Contact Page
			return;
		},
		'default': function(){
			console.log('default visit');
			return;
		}
	};

	self.leave = {
		0: function(){ // Home Page
			$('.diamond').removeClass('anim-diamond');
		},
		1: function(){ // Portfolio Page
			return;
		},
		2: function(){ // About Page
			return;
		},
		3: function(){ // Contact Page
			return;
		},
		'default': function(){
			console.log('default leave');
			return;
		}
	};
}
var pages = new Pages();