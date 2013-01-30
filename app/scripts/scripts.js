(function($, window, undefined){
	var CANVAS_W = 320;

	var app = {
		init : function() {
			this.layerElm = $('.layer');
			this.startX = 0;
			this.currentPos = 0;
			this.currentDeg = 0;
			this.initEvent();
		},
		initEvent: function() {
			var doc = $(window.document)[0];
			doc.addEventListener('touchstart', this);
			doc.addEventListener('touchmove', this);
			doc.addEventListener('touchend', this);
		},
		handleEvent: function(event) {
			switch(event.type){
				case 'touchstart' : 
					this.onTouchStart(event);
					break;
				case 'touchmove' : 
					this.onTouchMove(event);
					break;
				case 'touchend' : 
					this.onTouchEnd(event);
					break;
			}
		},
		onTouchStart: function(e) {
			this.startX = e.touches[0].clientX;
		},
		onTouchMove: function(e) {
			var moveX = e.touches[0].clientX - this.startX;
			this.changeTransform(moveX);
		},
		onTouchEnd: function(e) {
			var moveX = e.changedTouches[0].clientX - this.startX;
			if(Math.abs(moveX) > 100) {
				if(moveX < 0) {
					this.currentDeg -= 90;
				}else {
					this.currentDeg += 90;
				}
			}
			this.setTransform(this.currentDeg);
		},
		changeTransform: function(distance) {
			var deg = distance / CANVAS_W * 90 | 0;
			this.setTransform(this.currentDeg + deg);
		},
		setTransform : function(deg) {
			this.layerElm.css('-webkit-transform', 'translate3d(0px, 0px, -160px) rotate3d(0, 1, 0, '+deg+'deg)');
		}
	}

	app.init();
})(jQuery, window);