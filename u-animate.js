(function () {
  var uiAnimate = function (options) {
    var defaults = {
      out_class: "fadeOut"
    }
    var options = $.extend(defaults, options);//继承默认参数

    let $list = [];

    function toggle_class () {
      let scrollTop = $(document).scrollTop();
      for (let i = 0;i < $list.length;i++) {
        let $item = $($list[i]);
        let delay = $item.attr("u-delay");
        let item_scrollTop = $item.offset().top;
        $item.css({ "animation-delay": delay + "ms" });
        if (item_scrollTop >= scrollTop - document.documentElement.clientHeight / 2 && item_scrollTop < scrollTop + document.documentElement.clientHeight) {
          let animate = $item.attr("u-animate");
          // console.log(scrollTop)
          // console.log(item_scrollTop)
          // console.log(scrollTop + document.documentElement.clientHeight)
          // console.log("window: " + document.documentElement.clientHeight);
          if (!$item.hasClass(animate))
            $item.removeClass(options.out_class).addClass(animate);
        }
        else {
          $item.removeClass($item.attr("u-animate")).addClass(options.out_class);
        }
      }
    }

    uiAnimate.prototype.scroll_to = function (tage, duraction) {
      if (/^[0-9]+.?[0-9]*$/.test(tage)) {
        $("html,body").animate({ scrollTop: tage + "px" }, (duraction ? duraction : 0), "swing")
      } else {
        $("html,body").animate({ scrollTop: $(tage)[0].offsetTop + "px" }, (duraction ? duraction : 0), "swing")
      }
    }


    $(document).ready(function () {
      console.log("uiAnimate")
      $list = $("[u-delay]");
      for (let i = 0;i < $list.length;i++) {
        let $item = $($list[i]);
        let delay = $item.attr("u-delay");
        $item.css({ "animation-delay": delay + "ms" });
        $item.addClass("animated");
        $item.removeAttr("u-delay");
      }
      toggle_class();

    })

    $(document).scroll(function () {
      toggle_class();
    })
  }
  window.uiAnimate = uiAnimate;
})();
