(function($, window, undefined){
	var CANVAS_W = 320,
		isTouch = 'ontouchend' in document,
		eventName = (function(en){
			return {
				start : en[0],
				move : en[1],
				end :en[2]
			};
		})((isTouch ? 'touchstart touchmove touchend' : 'mousedown mousemove mouseup').split(' '));

	var app = {
		init : function() {
			this.layerElm = $('.layer');
			this.startX = 0;
			this.isMove = false;
			this.currentDeg = 0;
			this.initEvent();
		},
		initEvent: function() {
			test = 1;
			var doc = $(window.document)[0];
			doc.addEventListener(eventName.start, this);
			doc.addEventListener(eventName.move, this);
			doc.addEventListener(eventName.end, this);
		},
		handleEvent: function(event) {
			switch(event.type){
				case eventName.start :
					this.onTouchStart(event);
					break;
				case eventName.move :
					this.onTouchMove(event);
					break;
				case eventName.end :
					this.onTouchEnd(event);
					break;
			}
		},
		onTouchStart: function(e) {
			this.isMove = true;
			this.startX = isTouch ? e.touches[0].clientX : e.clientX;
		},
		onTouchMove: function(e) {
			if(!this.isMove) {return;}
			var moveX = (isTouch ? e.touches[0].clientX : e.clientX) - this.startX;
			this.changeTransform(moveX);
		},
		onTouchEnd: function(e) {
			this.isMove = false;
			var moveX = (isTouch ? e.changedTouches[0].clientX : e.clientX) - this.startX;
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
			var deg = (distance / CANVAS_W * 90) | 0;
			this.setTransform(this.currentDeg + deg);
		},
		setTransform : function(deg) {
			this.layerElm.css('-webkit-transform', 'translate3d(0px, 0px, -160px) rotate3d(0, 1, 0, '+deg+'deg)');
		}
	};

	app.init();
})(jQuery, window);