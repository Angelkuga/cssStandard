var W = {
  pageWidth: 0,
  pageHeight: 0,
  curPage: 0,
  oldPage: -1,
  pageLen: 0,
  movePrevent: !0,
  loading: !1,
  box: null,
  items: null,
  getPage: function () {
  },
  init: function () {
    W.box = document.querySelector(".pages"),
      W.items = document.querySelectorAll(".pages>.page"),
      W.pageLen = W.items.length,
      W.initPage(),
      W.bindEvent()
  },
  initPage: function () {
    W.pageWidth = document.documentElement.getBoundingClientRect().width,
      W.pageHeight = document.documentElement.getBoundingClientRect().height;
    for (var e = 0; e < W.pageLen; e++) {
      W.items[e].style.width = W.pageWidth + "px";
      W.items[e].style.height = W.pageHeight + "px";
    }
    // 这个代码 是什么情况 
    -1 != W.oldPage && W.animatePage(W.curPage)
  },
  nextPage: function () {
    W.curPage++,
      W.animatePage(W.curPage)
  },
  prevPage: function () {
    W.curPage--,
      W.animatePage(W.curPage)
  },
  addClass: function (e, t) {
    for (var a = "", n = new RegExp(t, "g"), o = 0, r = e.length; r > o; o++)
      a = e[o].className, e[o].className = (a.replace(n, "") + " " + t).replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
  },
  removeClass: function (e, t) {
    for (var a = "", n = new RegExp(t, "g"), o = 0, r = e.length; r > o; o++)
      a = e[o].className, e[o].className = a.replace(n, "").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
  },
  animatePage: function (e) {
    // W.getPage(e);
    0 > e && (e = 0),
    e >= W.pageLen - 1 && (e = W.pageLen - 1),
      W.curPage = e;
    var t = W.curPage * -W.pageHeight;
    e++,
      W.box.style.webkitTransform = "translate3d(0, " + t + "px, 0)",
      W.addClass(document.querySelectorAll(".page" + e), "page_show"),
      W.removeClass(document.querySelectorAll(".page" + parseInt(e + 1) + ",.page" + parseInt(e - 1)), "page_show"),
      setTimeout(function () {
        W.addClass(document.querySelectorAll(".page" + parseInt(e + 1) + ",.page" + parseInt(e - 1)), "no-transition"),
          setTimeout(function () {
            W.removeClass(document.querySelectorAll(".page" + parseInt(e + 1) + ",.page" + parseInt(e - 1)), "no-transition")
          }, 10)
      }, 200),
      W.movePrevent = !0,
      setTimeout(function () {
        W.movePrevent = !1
      }, 300),

    W.curPage != W.oldPage && (W.oldPage = W.curPage, W.changePage())
  },
  bindEvent: function () {
    var e = document.getElementById("page");
    e.addEventListener("touchstart", function (e) {
      W.loading || W.touchStart(e)
    }),
      e.addEventListener("touchmove", function (e) {
        W.loading || W.touchMove(e),
          e.preventDefault()
      }),
      e.addEventListener("touchend", function (e) {
        W.loading || W.touchEnd(e)
      }),
      window.addEventListener("resize", function () {
        W.initPage()
      }, !1)
  },
  startX: 0,
  startY: 0,
  isMove: !0,
  touchStart: function (e) {
    return W.movePrevent ? (e.preventDefault(), !1) : (W.addClass([W.box], "page-no-transition"), e = e.changedTouches[0], W.startX = e.pageX, W.startY = e.pageY, void(W.isMove = !0))
  },
  touchMove: function (e) {
    if (W.movePrevent)
      return e.preventDefault(), !1;
    var t = e.changedTouches[0],
      a = t.pageX,
      n = t.pageY,
      o = W.curPage * -W.pageHeight + (n - W.startY);
    console.log('pageId:'+W.curPage+"pageHeight:"+W.pageHeight+"pageDelY:"+(n-W.startY));
    console.log('transY'+o);
    return !W.isMove || Math.abs(a - W.startX) > Math.abs(n - W.startY) ? (W.isMove = !1, e.preventDefault(), !1) : void(W.box.style.webkitTransform = "translate3d(0," + o + "px, 0)")
  },
  touchEnd: function (e) {
    if (W.movePrevent)
      return e.preventDefault(), !1;
    var t = e.changedTouches[0].pageY;
    W.removeClass([W.box], "page-no-transition");
    if(Math.abs(t - W.startY) <= 50 || !W.isMove) {
      var o = W.curPage * -W.pageHeight;
      W.box.style.webkitTransform = "translate3d(0, " + o + "px, 0)";
      return ;
    } else if(t > W.startY){
      W.prevPage()
    } else {
      W.nextPage()
    }
  },
  touchImg: function () {
  },
  initDonut: function () {
  },
  changePage: function () {
    1 == W.curPage
  }
};

W.init(), W.animatePage(0);
