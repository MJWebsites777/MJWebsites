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
	        bg.eq(bgIndex).opacity('');
	        bgIndex++;
	        bg.eq(bgIndex).opacity(1);
	    }

	    prevPage = currentPage;
	    currentPage++;
	    pageName = $('.page').eq(currentPage).attr('class').replace(' page', '');
	    checkPage();
	    //$('.page').eq(prevPage).find('.content').opacity(0);
	    //$('.page').eq(currentPage).find('.content').opacity('');

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
	        bg.eq(bgIndex).opacity('');
	        bgIndex--;
	        bg.eq(bgIndex).opacity(1);
	    }

	    prevPage = currentPage;
	    currentPage--;
	    pageName = $('.page').eq(currentPage).attr('class').replace(' page', '');
	    checkPage();
	    //$('.page').eq(prevPage).find('.content').opacity(0);
	    //$('.page').eq(currentPage).find('.content').opacity('');

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

	self.visit = {
		0: function(){ // Home Page
			animateDiamonds();
		},
		1: function(){ // JGP Page
			//$('.jgp .container .content').opacity('');
		},
		2: function(){ // WEFC Page
			return;
		},	
		3: function(){ // About Page
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
		1: function(){ // JGP Page
			return;
		},
		2: function(){ // WEFC Page
			return;
		},
		3: function(){ // About Page
			return;
		},
		'default': function(){
			console.log('default leave');
			return;
		}
	};
}
var pages = new Pages();