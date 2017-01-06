var Slide = {
	pageWidth: 0,
	pageHeight: 0,
	curPage: 0,
	oldPage: -1,
	pageLen: 0,
	movePrevent:  false,
	loading: false,
	box: null,
	items: null,
	startX: 0,
	startY: 0,
	isMove: false,
	slideDirection: "v",
  touchAvailable: false,

	init: function() {
		Slide.box = document.querySelector(".pages");
		Slide.items = document.querySelectorAll(".page");
		Slide.pageLen = Slide.items.length;
		Slide.initPage();
		Slide.bindEvent();
	},

	initPage: function() {
		Slide.pageWidth = document.documentElement.getBoundingClientRect().width;
		Slide.pageHeight = document.documentElement.getBoundingClientRect().height;
		if(Slide.slideDirection == 'h') {
			Slide.box.style.width = Slide.pageWidth * Slide.pageLen + "px";
			Slide.box.style.height = Slide.pageHeight + "px";
		}

		for(var i=0; i< Slide.pageLen; i++) {
			var page = Slide.items[i];
			page.style.width = Slide.pageWidth + "px";
			page.style.height = Slide.pageHeight + "px";
			if(Slide.slideDirection == 'h') {
				page.style.float = "left";
			}
		}
		Slide.animatePage(Slide.curPage);
	},

	nextPage: function() {
		Slide.curPage = Slide.curPage + 1;
		Slide.animatePage(Slide.curPage);
	},
	prevPage: function() {
		Slide.curPage = Slide.curPage - 1;
		Slide.animatePage(Slide.curPage);
	},
	addClass: function() {

	},
	removeClass: function() {

	},

	animatePage: function(pageId) {
		if(pageId < 0) {
			pageId = 0;
		} else if(pageId > Slide.pageLen -1) {
			pageId = Slide.pageLen - 1;
		}
		Slide.curPage = pageId;
		var transX, transY;
		if(Slide.slideDirection == 'v') {
			transX = 0;
			transY = (-1) * pageId * Slide.pageHeight;

		} else if (Slide.slideDirection == 'h') {
			transX = (-1) * pageId * Slide.pageWidth;
			transY = 0;
		}
		Slide.setStyle(transX, transY);
		// 添加动画控制开关

	},

	bindEvent: function() {
		var pageBox = document.getElementById("page");
		pageBox.addEventListener("touchstart", function (e) {
			Slide.touchStart(e);
		});
		pageBox.addEventListener("touchmove", function (e) {
			Slide.touchMove(e);
		});
		pageBox.addEventListener("touchend", function (e) {
			Slide.touchEnd(e);
		});
	},

	touchStart: function(e) {
		e.preventDefault();
		if(Slide.movePrevent) {
			return false;
		}

		Slide.startX = e.changedTouches[0].pageX;
		Slide.startY = e.changedTouches[0].pageY;
		console.log(`startX,startY(${Slide.startX},${Slide.startY})`);
	},

	touchMove: function(e) {
		e.preventDefault();
		if(Slide.movePrevent) {
			return false;
		}
    // 上锁
    if(touchtouchAvailable) {
      Slide.touchtouchAvailable = false;
    } eles {
      return false;
    }
		var curPoint = e.changedTouches[0],
				x = curPoint.pageX,
				y = curPoint.pageY,
				deltaX,
				deltaY,
				transX,
				transY,
				styles;

		deltaX = x - Slide.startX,
		deltaY = y - Slide.startY;
		console.log(`deltaX,deltaY(${deltaX},${deltaY})`);
		if(Slide.slideDirection == 'h') {
			if(Math.abs(deltaX)>= 40) {
				Slide.isMove = true;
			} else {
				Slide.isMove = false;
			}
			transX = (-1) * Slide.curPage * Slide.pageWidth + deltaX;
			transY = 0;
		}
		if(Slide.slideDirection == 'v') {
			if(Math.abs(deltaY) >= 50) {
				Slide.isMove = true;
			} else {
				Slide.isMove = false;
			}
			transX = 0;
			transY = (-1) * Slide.curPage * Slide.pageHeight + deltaY;
		}
		Slide.setStyle(transX, transY);

	},

	touchEnd: function(e) {
		e.preventDefault();
		if(Slide.movePrevent) {
			return false;
		}
		var x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY;
		//需要切换时  切换上下页
		console.log("isMove"+Slide.isMove);
		if(Slide.isMove) {
			var direction; // 1 表示正向   -1 表示反向
			if(Slide.slideDirection == 'h') {
				if((x - Slide.startX) >= 0 ) {
					direction = 1;
				} else {
					direction = -1;
				}
			} else if (Slide.slideDirection == 'v') {
				if((y - Slide.startY) >= 0 ) {
					direction = 1;
				} else {
					direction = -1;
				}
			}
			console.log("slideMoveDirection"+direction);
			if(direction == '-1') {
				Slide.nextPage();
			} else {
				Slide.prevPage();
			}
		}
		// 不需要切换时 状态恢复
		Slide.animatePage(Slide.curPage);
    // 解锁
    if(!Slide.touchAvailable) {
      Slide.touchAvailable  = true;
    }
	},

	setStyle: function(x, y) {
		var styles = 'translate3d('+ x +'px, '+ y +'px, 0)';
		Slide.box.style.webkitTransform = styles;
	}
};
Slide.init();
Slide.animatePage(0);
