// --- file[jquery.animateNumber.js] ---
/** @preserve jQuery animateNumber plugin v0.0.6
 * (c) 2013, Alexandr Borisov.
 * https://github.com/aishek/jquery-animateNumber
 */

! function(e) {
  if (!e.Tween || !e.Tween.propHooks) throw new Error("jquery.animateNumber requires jQuery 1.8.0 or higher");
  var t = {
    numberStep: function(t, r) {
      var n = Math.floor(t),
        a = e(r.elem);
      a.text(n)
    }
  };
  e.Tween.propHooks.number = {
    set: function(e) {
      if (e.elem.nodeType && e.elem.parentNode) {
        var r = e.elem._animateNumberSetter;
        r || (r = t.numberStep), r(e.now, e)
      }
    }
  }, e.animateNumber = {
    numberStepFactories: {
      append: function(t) {
        return function(r, n) {
          var a = Math.floor(r),
            o = e(n.elem);
          o.prop("number", r).text(a + t)
        }
      },
      separator: function(t, r) {
        return t = t || " ", r = r || 3,
          function(n, a) {
            var o = Math.floor(n),
              u = o.toString(),
              i = e(a.elem);
            if (u.length > r) {
              for (var m, p, l, f = u.split("").reverse(), h = [], s = 0, c = Math.ceil(u.length / r); c > s; s++) {
                for (m = "", l = 0; r > l && (p = s * r + l, p != u.length); l++) m += f[p];
                h.push(m)
              }
              var b = h[h.length - 1];
              h[h.length - 1] = parseInt(b), u = h.join(t), u = u.split("").reverse().join("")
            }
            i.prop("number", n).text(u)
          }
      }
    }
  }, e.fn.animateNumber = function() {
    for (var r = arguments[0], n = e.extend({}, t, r), a = e(this), o = [n], u = 1, i = arguments.length; i > u; u++) o.push(arguments[u]);
    if (r.numberStep) {
      var m = this.each(function() {
          this._animateNumberSetter = r.numberStep
        }),
        p = n.complete;
      n.complete = function() {
        m.each(function() {
          delete this._animateNumberSetter
        }), p && p.apply(this, arguments)
      }
    }
    return a.animate.apply(a, o)
  }
}(jQuery);

// --- file[jquery.prettyphoto.js] ---
/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 3.1.5
------------------------------------------------------------------------- */
(function(e) {
  function t() {
    var e = location.href;
    hashtag = e.indexOf("#prettyPhoto") !== -1 ? decodeURI(e.substring(e.indexOf("#prettyPhoto") + 1, e.length)) : false;
    return hashtag
  }

  function n() {
    if (typeof theRel == "undefined") return;
    location.hash = theRel + "/" + rel_index + "/"
  }

  function r() {
    if (location.href.indexOf("#prettyPhoto") !== -1) location.hash = "prettyPhoto"
  }

  function i(e, t) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var n = "[\\?&]" + e + "=([^&#]*)";
    var r = new RegExp(n);
    var i = r.exec(t);
    return i == null ? "" : i[1]
  }
  e.prettyPhoto = {
    version: "3.1.5"
  };
  e.fn.prettyPhoto = function(s) {
    function g() {
      e(".pp_loaderIcon").hide();
      projectedTop = scroll_pos["scrollTop"] + (d / 2 - a["containerHeight"] / 2);
      if (projectedTop < 0) projectedTop = 0;
      $ppt.fadeTo(settings.animation_speed, 1);
      $pp_pic_holder.find(".pp_content").animate({
        height: a["contentHeight"],
        width: a["contentWidth"]
      }, settings.animation_speed);
      $pp_pic_holder.animate({
        top: projectedTop,
        left: v / 2 - a["containerWidth"] / 2 < 0 ? 0 : v / 2 - a["containerWidth"] / 2,
        width: a["containerWidth"]
      }, settings.animation_speed, function() {
        $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(a["height"]).width(a["width"]);
        $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed);
        if (isSet && S(pp_images[set_position]) == "image") {
          $pp_pic_holder.find(".pp_hoverContainer").show()
        } else {
          $pp_pic_holder.find(".pp_hoverContainer").hide()
        }
        if (settings.allow_expand) {
          if (a["resized"]) {
            e("a.pp_expand,a.pp_contract").show()
          } else {
            e("a.pp_expand").hide()
          }
        }
        if (settings.autoplay_slideshow && !m && !f) e.prettyPhoto.startSlideshow();
        settings.changepicturecallback();
        f = true
      });
      C();
      s.ajaxcallback()
    }

    function y(t) {
      $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden");
      $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function() {
        e(".pp_loaderIcon").show();
        t()
      })
    }

    function b(t) {
      t > 1 ? e(".pp_nav").show() : e(".pp_nav").hide()
    }

    function w(e, t) {
      resized = false;
      E(e, t);
      imageWidth = e, imageHeight = t;
      if ((p > v || h > d) && doresize && settings.allow_resize && !u) {
        resized = true, fitting = false;
        while (!fitting) {
          if (p > v) {
            imageWidth = v - 200;
            imageHeight = t / e * imageWidth
          } else if (h > d) {
            imageHeight = d - 200;
            imageWidth = e / t * imageHeight
          } else {
            fitting = true
          }
          h = imageHeight, p = imageWidth
        }
        if (p > v || h > d) {
          w(p, h)
        }
        E(imageWidth, imageHeight)
      }
      return {
        width: Math.floor(imageWidth),
        height: Math.floor(imageHeight),
        containerHeight: Math.floor(h),
        containerWidth: Math.floor(p) + settings.horizontal_padding * 2,
        contentHeight: Math.floor(l),
        contentWidth: Math.floor(c),
        resized: resized
      }
    }

    function E(t, n) {
      t = parseFloat(t);
      n = parseFloat(n);
      $pp_details = $pp_pic_holder.find(".pp_details");
      $pp_details.width(t);
      detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom"));
      $pp_details = $pp_details.clone().addClass(settings.theme).width(t).appendTo(e("body")).css({
        position: "absolute",
        top: -1e4
      });
      detailsHeight += $pp_details.height();
      detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight;
      $pp_details.remove();
      $pp_title = $pp_pic_holder.find(".ppt");
      $pp_title.width(t);
      titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom"));
      $pp_title = $pp_title.clone().appendTo(e("body")).css({
        position: "absolute",
        top: -1e4
      });
      titleHeight += $pp_title.height();
      $pp_title.remove();
      l = n + detailsHeight;
      c = t;
      h = l + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height();
      p = t
    }

    function S(e) {
      if (e.match(/youtube\.com\/watch/i) || e.match(/youtu\.be/i)) {
        return "youtube"
      } else if (e.match(/vimeo\.com/i)) {
        return "vimeo"
      } else if (e.match(/\b.mov\b/i)) {
        return "quicktime"
      } else if (e.match(/\b.swf\b/i)) {
        return "flash"
      } else if (e.match(/\biframe=true\b/i)) {
        return "iframe"
      } else if (e.match(/\bajax=true\b/i)) {
        return "ajax"
      } else if (e.match(/\bcustom=true\b/i)) {
        return "custom"
      } else if (e.substr(0, 1) == "#") {
        return "inline"
      } else {
        return "image"
      }
    }

    function x() {
      if (doresize && typeof $pp_pic_holder != "undefined") {
        scroll_pos = T();
        contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width();
        projectedTop = d / 2 + scroll_pos["scrollTop"] - contentHeight / 2;
        if (projectedTop < 0) projectedTop = 0;
        if (contentHeight > d) return;
        $pp_pic_holder.css({
          top: projectedTop,
          left: v / 2 + scroll_pos["scrollLeft"] - contentwidth / 2
        })
      }
    }

    function T() {
      if (self.pageYOffset) {
        return {
          scrollTop: self.pageYOffset,
          scrollLeft: self.pageXOffset
        }
      } else if (document.documentElement && document.documentElement.scrollTop) {
        return {
          scrollTop: document.documentElement.scrollTop,
          scrollLeft: document.documentElement.scrollLeft
        }
      } else if (document.body) {
        return {
          scrollTop: document.body.scrollTop,
          scrollLeft: document.body.scrollLeft
        }
      }
    }

    function N() {
      d = e(window).height(), v = e(window).width();
      if (typeof $pp_overlay != "undefined") $pp_overlay.height(e(document).height()).width(v)
    }

    function C() {
      if (isSet && settings.overlay_gallery && S(pp_images[set_position]) == "image") {
        itemWidth = 52 + 5;
        navWidth = settings.theme == "facebook" || settings.theme == "pp_default" ? 50 : 30;
        itemsPerPage = Math.floor((a["containerWidth"] - 100 - navWidth) / itemWidth);
        itemsPerPage = itemsPerPage < pp_images.length ? itemsPerPage : pp_images.length;
        totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;
        if (totalPage == 0) {
          navWidth = 0;
          $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()
        } else {
          $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show()
        }
        galleryWidth = itemsPerPage * itemWidth;
        fullGalleryWidth = pp_images.length * itemWidth;
        $pp_gallery.css("margin-left", -(galleryWidth / 2 + navWidth / 2)).find("div:first").width(galleryWidth + 5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected");
        goToPage = Math.floor(set_position / itemsPerPage) < totalPage ? Math.floor(set_position / itemsPerPage) : totalPage;
        e.prettyPhoto.changeGalleryPage(goToPage);
        $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected")
      } else {
        $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")
      }
    }

    function k(t) {
      if (settings.social_tools) facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href));
      settings.markup = settings.markup.replace("{pp_social}", "");
      e("body").append(settings.markup);
      $pp_pic_holder = e(".pp_pic_holder"), $ppt = e(".ppt"), $pp_overlay = e("div.pp_overlay");
      if (isSet && settings.overlay_gallery) {
        currentGalleryPage = 0;
        toInject = "";
        for (var n = 0; n < pp_images.length; n++) {
          if (!pp_images[n].match(/\b(jpg|jpeg|png|gif)\b/gi)) {
            classname = "default";
            img_src = ""
          } else {
            classname = "";
            img_src = pp_images[n]
          }
          toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>"
        }
        toInject = settings.gallery_markup.replace(/{gallery}/g, toInject);
        $pp_pic_holder.find("#pp_full_res").after(toInject);
        $pp_gallery = e(".pp_pic_holder .pp_gallery"), $pp_gallery_li = $pp_gallery.find("li");
        $pp_gallery.find(".pp_arrow_next").click(function() {
          e.prettyPhoto.changeGalleryPage("next");
          e.prettyPhoto.stopSlideshow();
          return false
        });
        $pp_gallery.find(".pp_arrow_previous").click(function() {
          e.prettyPhoto.changeGalleryPage("previous");
          e.prettyPhoto.stopSlideshow();
          return false
        });
        $pp_pic_holder.find(".pp_content").hover(function() {
          $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()
        }, function() {
          $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()
        });
        itemWidth = 52 + 5;
        $pp_gallery_li.each(function(t) {
          e(this).find("a").click(function() {
            e.prettyPhoto.changePage(t);
            e.prettyPhoto.stopSlideshow();
            return false
          })
        })
      }
      if (settings.slideshow) {
        $pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>');
        $pp_pic_holder.find(".pp_nav .pp_play").click(function() {
          e.prettyPhoto.startSlideshow();
          return false
        })
      }
      $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme);
      $pp_overlay.css({
        opacity: 0,
        height: e(document).height(),
        width: e(window).width()
      }).bind("click", function() {
        if (!settings.modal) e.prettyPhoto.close()
      });
      e("a.pp_close").bind("click", function() {
        e.prettyPhoto.close();
        return false
      });
      if (settings.allow_expand) {
        e("a.pp_expand").bind("click", function(t) {
          if (e(this).hasClass("pp_expand")) {
            e(this).removeClass("pp_expand").addClass("pp_contract");
            doresize = false
          } else {
            e(this).removeClass("pp_contract").addClass("pp_expand");
            doresize = true
          }
          y(function() {
            e.prettyPhoto.open()
          });
          return false
        })
      }
      $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click", function() {
        e.prettyPhoto.changePage("previous");
        e.prettyPhoto.stopSlideshow();
        return false
      });
      $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function() {
        e.prettyPhoto.changePage("next");
        e.prettyPhoto.stopSlideshow();
        return false
      });
      x()
    }
    s = jQuery.extend({
      hook: "rel",
      animation_speed: "fast",
      ajaxcallback: function() {},
      slideshow: 5e3,
      autoplay_slideshow: false,
      opacity: .8,
      show_title: true,
      allow_resize: true,
      allow_expand: true,
      default_width: 500,
      default_height: 344,
      counter_separator_label: "/",
      theme: "pp_default",
      horizontal_padding: 20,
      hideflash: false,
      wmode: "opaque",
      autoplay: true,
      modal: false,
      deeplinking: true,
      overlay_gallery: true,
      overlay_gallery_max: 30,
      keyboard_shortcuts: true,
      changepicturecallback: function() {},
      callback: function() {},
      ie6_fallback: true,
      markup: '<div class="pp_pic_holder"> 						<div class="ppt"> </div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<div class="pp_nav"> 												<a href="#" class="pp_arrow_previous">Previous</a> 												<p class="currentTextHolder">0/0</p> 												<a href="#" class="pp_arrow_next">Next</a> 											</div> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<a class="pp_close" href="#">Close</a> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>',
      gallery_markup: '<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>',
      image_markup: '<img id="fullResImage" src="{path}" />',
      flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
      quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
      iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
      inline_markup: '<div class="pp_inline">{content}</div>',
      custom_markup: "",
      social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'
    }, s);
    var o = this,
      u = false,
      a, f, l, c, h, p, d = e(window).height(),
      v = e(window).width(),
      m;
    doresize = true, scroll_pos = T();
    e(window).unbind("resize.prettyphoto").bind("resize.prettyphoto", function() {
      x();
      N()
    });
    if (s.keyboard_shortcuts) {
      e(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto", function(t) {
        if (typeof $pp_pic_holder != "undefined") {
          if ($pp_pic_holder.is(":visible")) {
            switch (t.keyCode) {
              case 37:
                e.prettyPhoto.changePage("previous");
                t.preventDefault();
                break;
              case 39:
                e.prettyPhoto.changePage("next");
                t.preventDefault();
                break;
              case 27:
                if (!settings.modal) e.prettyPhoto.close();
                t.preventDefault();
                break
            }
          }
        }
      })
    }
    e.prettyPhoto.initialize = function() {
      settings = s;
      if (settings.theme == "pp_default") settings.horizontal_padding = 16;
      theRel = e(this).attr(settings.hook);
      galleryRegExp = /\[(?:.*)\]/;
      isSet = galleryRegExp.exec(theRel) ? true : false;
      pp_images = isSet ? jQuery.map(o, function(t, n) {
        if (e(t).attr(settings.hook).indexOf(theRel) != -1) return e(t).attr("href")
      }) : e.makeArray(e(this).attr("href"));
      pp_titles = isSet ? jQuery.map(o, function(t, n) {
        if (e(t).attr(settings.hook).indexOf(theRel) != -1) return e(t).find("img").attr("alt") ? e(t).find("img").attr("alt") : ""
      }) : e.makeArray(e(this).find("img").attr("alt"));
      pp_descriptions = isSet ? jQuery.map(o, function(t, n) {
        if (e(t).attr(settings.hook).indexOf(theRel) != -1) return e(t).attr("title") ? e(t).attr("title") : ""
      }) : e.makeArray(e(this).attr("title"));
      if (pp_images.length > settings.overlay_gallery_max) settings.overlay_gallery = false;
      set_position = jQuery.inArray(e(this).attr("href"), pp_images);
      rel_index = isSet ? set_position : e("a[" + settings.hook + "^='" + theRel + "']").index(e(this));
      k(this);
      if (settings.allow_resize) e(window).bind("scroll.prettyphoto", function() {
        x()
      });
      e.prettyPhoto.open();
      return false
    };
    e.prettyPhoto.open = function(t) {
      if (typeof settings == "undefined") {
        settings = s;
        pp_images = e.makeArray(arguments[0]);
        pp_titles = arguments[1] ? e.makeArray(arguments[1]) : e.makeArray("");
        pp_descriptions = arguments[2] ? e.makeArray(arguments[2]) : e.makeArray("");
        isSet = pp_images.length > 1 ? true : false;
        set_position = arguments[3] ? arguments[3] : 0;
        k(t.target)
      }
      if (settings.hideflash) e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "hidden");
      b(e(pp_images).size());
      e(".pp_loaderIcon").show();
      if (settings.deeplinking) n();
      if (settings.social_tools) {
        facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href));
        $pp_pic_holder.find(".pp_social").html(facebook_like_link)
      }
      if ($ppt.is(":hidden")) $ppt.css("opacity", 0).show();
      $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity);
      $pp_pic_holder.find(".currentTextHolder").text(set_position + 1 + settings.counter_separator_label + e(pp_images).size());
      if (typeof pp_descriptions[set_position] != "undefined" && pp_descriptions[set_position] != "") {
        $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position]))
      } else {
        $pp_pic_holder.find(".pp_description").hide()
      }
      movie_width = parseFloat(i("width", pp_images[set_position])) ? i("width", pp_images[set_position]) : settings.default_width.toString();
      movie_height = parseFloat(i("height", pp_images[set_position])) ? i("height", pp_images[set_position]) : settings.default_height.toString();
      u = false;
      if (movie_height.indexOf("%") != -1) {
        movie_height = parseFloat(e(window).height() * parseFloat(movie_height) / 100 - 150);
        u = true
      }
      if (movie_width.indexOf("%") != -1) {
        movie_width = parseFloat(e(window).width() * parseFloat(movie_width) / 100 - 150);
        u = true
      }
      $pp_pic_holder.fadeIn(function() {
        settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined" ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html(" ");
        imgPreloader = "";
        skipInjection = false;
        switch (S(pp_images[set_position])) {
          case "image":
            imgPreloader = new Image;
            nextImage = new Image;
            if (isSet && set_position < e(pp_images).size() - 1) nextImage.src = pp_images[set_position + 1];
            prevImage = new Image;
            if (isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1];
            $pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]);
            imgPreloader.onload = function() {
              a = w(imgPreloader.width, imgPreloader.height);
              g()
            };
            imgPreloader.onerror = function() {
              alert("Image cannot be loaded. Make sure the path is correct and image exist.");
              e.prettyPhoto.close()
            };
            imgPreloader.src = pp_images[set_position];
            break;
          case "youtube":
            a = w(movie_width, movie_height);
            movie_id = i("v", pp_images[set_position]);
            if (movie_id == "") {
              movie_id = pp_images[set_position].split("youtu.be/");
              movie_id = movie_id[1];
              if (movie_id.indexOf("?") > 0) movie_id = movie_id.substr(0, movie_id.indexOf("?"));
              if (movie_id.indexOf("&") > 0) movie_id = movie_id.substr(0, movie_id.indexOf("&"))
            }
            movie = "http://www.youtube.com/embed/" + movie_id;
            i("rel", pp_images[set_position]) ? movie += "?rel=" + i("rel", pp_images[set_position]) : movie += "?rel=1";
            if (settings.autoplay) movie += "&autoplay=1";
            toInject = settings.iframe_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
            break;
          case "vimeo":
            a = w(movie_width, movie_height);
            movie_id = pp_images[set_position];
            var t = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;
            var n = movie_id.match(t);
            movie = "http://player.vimeo.com/video/" + n[3] + "?title=0&byline=0&portrait=0";
            if (settings.autoplay) movie += "&autoplay=1;";
            vimeo_width = a["width"] + "/embed/?moog_width=" + a["width"];
            toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, a["height"]).replace(/{path}/g, movie);
            break;
          case "quicktime":
            a = w(movie_width, movie_height);
            a["height"] += 15;
            a["contentHeight"] += 15;
            a["containerHeight"] += 15;
            toInject = settings.quicktime_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
            break;
          case "flash":
            a = w(movie_width, movie_height);
            flash_vars = pp_images[set_position];
            flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length);
            filename = pp_images[set_position];
            filename = filename.substring(0, filename.indexOf("?"));
            toInject = settings.flash_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + "?" + flash_vars);
            break;
          case "iframe":
            a = w(movie_width, movie_height);
            frame_url = pp_images[set_position];
            frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1);
            toInject = settings.iframe_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{path}/g, frame_url);
            break;
          case "ajax":
            doresize = false;
            a = w(movie_width, movie_height);
            doresize = true;
            skipInjection = true;
            e.get(pp_images[set_position], function(e) {
              toInject = settings.inline_markup.replace(/{content}/g, e);
              $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
              g()
            });
            break;
          case "custom":
            a = w(movie_width, movie_height);
            toInject = settings.custom_markup;
            break;
          case "inline":
            myClone = e(pp_images[set_position]).clone().append('<br clear="all" />').css({
              width: settings.default_width
            }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(e("body")).show();
            doresize = false;
            a = w(e(myClone).width(), e(myClone).height());
            doresize = true;
            e(myClone).remove();
            toInject = settings.inline_markup.replace(/{content}/g, e(pp_images[set_position]).html());
            break
        }
        if (!imgPreloader && !skipInjection) {
          $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
          g()
        }
      });
      return false
    };
    e.prettyPhoto.changePage = function(t) {
      currentGalleryPage = 0;
      if (t == "previous") {
        set_position--;
        if (set_position < 0) set_position = e(pp_images).size() - 1
      } else if (t == "next") {
        set_position++;
        if (set_position > e(pp_images).size() - 1) set_position = 0
      } else {
        set_position = t
      }
      rel_index = set_position;
      if (!doresize) doresize = true;
      if (settings.allow_expand) {
        e(".pp_contract").removeClass("pp_contract").addClass("pp_expand")
      }
      y(function() {
        e.prettyPhoto.open()
      })
    };
    e.prettyPhoto.changeGalleryPage = function(e) {
      if (e == "next") {
        currentGalleryPage++;
        if (currentGalleryPage > totalPage) currentGalleryPage = 0
      } else if (e == "previous") {
        currentGalleryPage--;
        if (currentGalleryPage < 0) currentGalleryPage = totalPage
      } else {
        currentGalleryPage = e
      }
      slide_speed = e == "next" || e == "previous" ? settings.animation_speed : 0;
      slide_to = currentGalleryPage * itemsPerPage * itemWidth;
      $pp_gallery.find("ul").animate({
        left: -slide_to
      }, slide_speed)
    };
    e.prettyPhoto.startSlideshow = function() {
      if (typeof m == "undefined") {
        $pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function() {
          e.prettyPhoto.stopSlideshow();
          return false
        });
        m = setInterval(e.prettyPhoto.startSlideshow, settings.slideshow)
      } else {
        e.prettyPhoto.changePage("next")
      }
    };
    e.prettyPhoto.stopSlideshow = function() {
      $pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function() {
        e.prettyPhoto.startSlideshow();
        return false
      });
      clearInterval(m);
      m = undefined
    };
    e.prettyPhoto.close = function() {
      if ($pp_overlay.is(":animated")) return;
      e.prettyPhoto.stopSlideshow();
      $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden");
      e("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function() {
        e(this).remove()
      });
      $pp_overlay.fadeOut(settings.animation_speed, function() {
        if (settings.hideflash) e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible");
        e(this).remove();
        e(window).unbind("scroll.prettyphoto");
        r();
        settings.callback();
        doresize = true;
        f = false;
        delete settings
      })
    };
    if (!pp_alreadyInitialized && t()) {
      pp_alreadyInitialized = true;
      hashIndex = t();
      hashRel = hashIndex;
      hashIndex = hashIndex.substring(hashIndex.indexOf("/") + 1, hashIndex.length - 1);
      hashRel = hashRel.substring(0, hashRel.indexOf("/"));
      setTimeout(function() {
        e("a[" + s.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click")
      }, 50)
    }
    return this.unbind("click.prettyphoto").bind("click.prettyphoto", e.prettyPhoto.initialize)
  };
})(jQuery);
var pp_alreadyInitialized = false

// --- file[jquery.inview.js] ---
/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
  ! function(e) {
  function n() {
    var n = window.innerHeight,
      t = document.compatMode;
    return (t || !e.support.boxModel) && (n = "CSS1Compat" == t ? document.documentElement.clientHeight : document.body.clientHeight), n
  }
  e(window).scroll(function() {
    var t = n(),
      o = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop,
      i = [];
    e.each(e.cache, function() {
      this.events && this.events.inview && i.push(this.handle.elem)
    }), i.length && e(i).each(function() {
      var n = e(this),
        i = n.offset().top,
        c = n.height(),
        d = n.data("inview") || !1;
      o > i + c || i > o + t ? d && (n.data("inview", !1), n.trigger("inview", [!1])) : i + c > o && (d || (n.data("inview", !0), n.trigger("inview", [!0])))
    })
  }), e(function() {
    e(window).scroll()
  })
}(jQuery);

// --- file[jquery.validate.min.js] ---
/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
 * Copyright (c) 2013 J�rn Zaefferer; Licensed MIT */
(function(t) {
  t.extend(t.fn, {
    validate: function(e) {
      if (!this.length) return e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), void 0;
      var i = t.data(this[0], "validator");
      return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
        i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
      }), this.submit(function(e) {
        function s() {
          var s;
          return i.settings.submitHandler ? (i.submitButton && (s = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && s.remove(), !1) : !0
        }
        return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : s() : (i.focusInvalid(), !1)
      })), i)
    },
    valid: function() {
      if (t(this[0]).is("form")) return this.validate().form();
      var e = !0,
        i = t(this[0].form).validate();
      return this.each(function() {
        e = e && i.element(this)
      }), e
    },
    removeAttrs: function(e) {
      var i = {},
        s = this;
      return t.each(e.split(/\s/), function(t, e) {
        i[e] = s.attr(e), s.removeAttr(e)
      }), i
    },
    rules: function(e, i) {
      var s = this[0];
      if (e) {
        var r = t.data(s.form, "validator").settings,
          n = r.rules,
          a = t.validator.staticRules(s);
        switch (e) {
          case "add":
            t.extend(a, t.validator.normalizeRule(i)), delete a.messages, n[s.name] = a, i.messages && (r.messages[s.name] = t.extend(r.messages[s.name], i.messages));
            break;
          case "remove":
            if (!i) return delete n[s.name], a;
            var u = {};
            return t.each(i.split(/\s/), function(t, e) {
              u[e] = a[e], delete a[e]
            }), u
        }
      }
      var o = t.validator.normalizeRules(t.extend({}, t.validator.classRules(s), t.validator.attributeRules(s), t.validator.dataRules(s), t.validator.staticRules(s)), s);
      if (o.required) {
        var l = o.required;
        delete o.required, o = t.extend({
          required: l
        }, o)
      }
      return o
    }
  }), t.extend(t.expr[":"], {
    blank: function(e) {
      return !t.trim("" + t(e).val())
    },
    filled: function(e) {
      return !!t.trim("" + t(e).val())
    },
    unchecked: function(e) {
      return !t(e).prop("checked")
    }
  }), t.validator = function(e, i) {
    this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
  }, t.validator.format = function(e, i) {
    return 1 === arguments.length ? function() {
      var i = t.makeArray(arguments);
      return i.unshift(e), t.validator.format.apply(this, i)
    } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function(t, i) {
      e = e.replace(RegExp("\\{" + t + "\\}", "g"), function() {
        return i
      })
    }), e)
  }, t.extend(t.validator, {
    defaults: {
      messages: {},
      groups: {},
      rules: {},
      errorClass: "error",
      validClass: "valid",
      errorElement: "label",
      focusInvalid: !0,
      errorContainer: t([]),
      errorLabelContainer: t([]),
      onsubmit: !0,
      ignore: ":hidden",
      ignoreTitle: !1,
      onfocusin: function(t) {
        this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
      },
      onfocusout: function(t) {
        this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
      },
      onkeyup: function(t, e) {
        (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
      },
      onclick: function(t) {
        t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
      },
      highlight: function(e, i, s) {
        "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(s) : t(e).addClass(i).removeClass(s)
      },
      unhighlight: function(e, i, s) {
        "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(s) : t(e).removeClass(i).addClass(s)
      }
    },
    setDefaults: function(e) {
      t.extend(t.validator.defaults, e)
    },
    messages: {
      required: "Se requiere este campo.",
      remote: "Verifique este campo.",
      email: "Ingresá un mail válido!",
      url: "Ingresa una URL válida.",
      date: "Please enter a valid date.",
      dateISO: "Please enter a valid date (ISO).",
      number: "Please enter a valid number.",
      digits: "Please enter only digits.",
      creditcard: "Please enter a valid credit card number.",
      equalTo: "Please enter the same value again.",
      maxlength: t.validator.format("Please enter no more than {0} characters."),
      minlength: t.validator.format("Please enter at least {0} characters."),
      rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
      range: t.validator.format("Please enter a value between {0} and {1}."),
      max: t.validator.format("Please enter a value less than or equal to {0}."),
      min: t.validator.format("Please enter a value greater than or equal to {0}.")
    },
    autoCreateRanges: !1,
    prototype: {
      init: function() {
        function e(e) {
          var i = t.data(this[0].form, "validator"),
            s = "on" + e.type.replace(/^validate/, "");
          i.settings[s] && i.settings[s].call(i, this[0], e)
        }
        this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
        var i = this.groups = {};
        t.each(this.settings.groups, function(e, s) {
          "string" == typeof s && (s = s.split(/\s/)), t.each(s, function(t, s) {
            i[s] = e
          })
        });
        var s = this.settings.rules;
        t.each(s, function(e, i) {
          s[e] = t.validator.normalizeRule(i)
        }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
      },
      form: function() {
        return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
      },
      checkForm: function() {
        this.prepareForm();
        for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
        return this.valid()
      },
      element: function(e) {
        e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
        var i = this.check(e) !== !1;
        return i ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
      },
      showErrors: function(e) {
        if (e) {
          t.extend(this.errorMap, e), this.errorList = [];
          for (var i in e) this.errorList.push({
            message: e[i],
            element: this.findByName(i)[0]
          });
          this.successList = t.grep(this.successList, function(t) {
            return !(t.name in e)
          })
        }
        this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
      },
      resetForm: function() {
        t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
      },
      numberOfInvalids: function() {
        return this.objectLength(this.invalid)
      },
      objectLength: function(t) {
        var e = 0;
        for (var i in t) e++;
        return e
      },
      hideErrors: function() {
        this.addWrapper(this.toHide).hide()
      },
      valid: function() {
        return 0 === this.size()
      },
      size: function() {
        return this.errorList.length
      },
      focusInvalid: function() {
        if (this.settings.focusInvalid) try {
          t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
        } catch (e) {}
      },
      findLastActive: function() {
        var e = this.lastActive;
        return e && 1 === t.grep(this.errorList, function(t) {
          return t.element.name === e.name
        }).length && e
      },
      elements: function() {
        var e = this,
          i = {};
        return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
          return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0)
        })
      },
      clean: function(e) {
        return t(e)[0]
      },
      errors: function() {
        var e = this.settings.errorClass.replace(" ", ".");
        return t(this.settings.errorElement + "." + e, this.errorContext)
      },
      reset: function() {
        this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
      },
      prepareForm: function() {
        this.reset(), this.toHide = this.errors().add(this.containers)
      },
      prepareElement: function(t) {
        this.reset(), this.toHide = this.errorsFor(t)
      },
      elementValue: function(e) {
        var i = t(e).attr("type"),
          s = t(e).val();
        return "radio" === i || "checkbox" === i ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof s ? s.replace(/\r/g, "") : s
      },
      check: function(e) {
        e = this.validationTargetFor(this.clean(e));
        var i, s = t(e).rules(),
          r = !1,
          n = this.elementValue(e);
        for (var a in s) {
          var u = {
            method: a,
            parameters: s[a]
          };
          try {
            if (i = t.validator.methods[a].call(this, n, e, u.parameters), "dependency-mismatch" === i) {
              r = !0;
              continue
            }
            if (r = !1, "pending" === i) return this.toHide = this.toHide.not(this.errorsFor(e)), void 0;
            if (!i) return this.formatAndAdd(e, u), !1
          } catch (o) {
            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + u.method + "' method.", o), o
          }
        }
        return r ? void 0 : (this.objectLength(s) && this.successList.push(e), !0)
      },
      customDataMessage: function(e, i) {
        return t(e).data("msg-" + i.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + i.toLowerCase())
      },
      customMessage: function(t, e) {
        var i = this.settings.messages[t];
        return i && (i.constructor === String ? i : i[e])
      },
      findDefined: function() {
        for (var t = 0; arguments.length > t; t++)
          if (void 0 !== arguments[t]) return arguments[t];
        return void 0
      },
      defaultMessage: function(e, i) {
        return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
      },
      formatAndAdd: function(e, i) {
        var s = this.defaultMessage(e, i.method),
          r = /\$?\{(\d+)\}/g;
        "function" == typeof s ? s = s.call(this, i.parameters, e) : r.test(s) && (s = t.validator.format(s.replace(r, "{$1}"), i.parameters)), this.errorList.push({
          message: s,
          element: e
        }), this.errorMap[e.name] = s, this.submitted[e.name] = s
      },
      addWrapper: function(t) {
        return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
      },
      defaultShowErrors: function() {
        var t, e;
        for (t = 0; this.errorList[t]; t++) {
          var i = this.errorList[t];
          this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message)
        }
        if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
          for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
        if (this.settings.unhighlight)
          for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
        this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
      },
      validElements: function() {
        return this.currentElements.not(this.invalidElements())
      },
      invalidElements: function() {
        return t(this.errorList).map(function() {
          return this.element
        })
      },
      showLabel: function(e, i) {
        var s = this.errorsFor(e);
        s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(i)) : (s = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (s = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(s).length || (this.settings.errorPlacement ? this.settings.errorPlacement(s, t(e)) : s.insertAfter(e))), !i && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, e)), this.toShow = this.toShow.add(s)
      },
      errorsFor: function(e) {
        var i = this.idOrName(e);
        return this.errors().filter(function() {
          return t(this).attr("for") === i
        })
      },
      idOrName: function(t) {
        return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
      },
      validationTargetFor: function(t) {
        return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
      },
      checkable: function(t) {
        return /radio|checkbox/i.test(t.type)
      },
      findByName: function(e) {
        return t(this.currentForm).find("[name='" + e + "']")
      },
      getLength: function(e, i) {
        switch (i.nodeName.toLowerCase()) {
          case "select":
            return t("option:selected", i).length;
          case "input":
            if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
        }
        return e.length
      },
      depend: function(t, e) {
        return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
      },
      dependTypes: {
        "boolean": function(t) {
          return t
        },
        string: function(e, i) {
          return !!t(e, i.form).length
        },
        "function": function(t, e) {
          return t(e)
        }
      },
      optional: function(e) {
        var i = this.elementValue(e);
        return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
      },
      startRequest: function(t) {
        this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
      },
      stopRequest: function(e, i) {
        this.pendingRequest--, 0 > this.pendingRequest && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
      },
      previousValue: function(e) {
        return t.data(e, "previousValue") || t.data(e, "previousValue", {
          old: null,
          valid: !0,
          message: this.defaultMessage(e, "remote")
        })
      }
    },
    classRuleSettings: {
      required: {
        required: !0
      },
      email: {
        email: !0
      },
      url: {
        url: !0
      },
      date: {
        date: !0
      },
      dateISO: {
        dateISO: !0
      },
      number: {
        number: !0
      },
      digits: {
        digits: !0
      },
      creditcard: {
        creditcard: !0
      }
    },
    addClassRules: function(e, i) {
      e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
    },
    classRules: function(e) {
      var i = {},
        s = t(e).attr("class");
      return s && t.each(s.split(" "), function() {
        this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
      }), i
    },
    attributeRules: function(e) {
      var i = {},
        s = t(e),
        r = s[0].getAttribute("type");
      for (var n in t.validator.methods) {
        var a;
        "required" === n ? (a = s.get(0).getAttribute(n), "" === a && (a = !0), a = !!a) : a = s.attr(n), /min|max/.test(n) && (null === r || /number|range|text/.test(r)) && (a = Number(a)), a ? i[n] = a : r === n && "range" !== r && (i[n] = !0)
      }
      return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i
    },
    dataRules: function(e) {
      var i, s, r = {},
        n = t(e);
      for (i in t.validator.methods) s = n.data("rule-" + i.toLowerCase()), void 0 !== s && (r[i] = s);
      return r
    },
    staticRules: function(e) {
      var i = {},
        s = t.data(e.form, "validator");
      return s.settings.rules && (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}), i
    },
    normalizeRules: function(e, i) {
      return t.each(e, function(s, r) {
        if (r === !1) return delete e[s], void 0;
        if (r.param || r.depends) {
          var n = !0;
          switch (typeof r.depends) {
            case "string":
              n = !!t(r.depends, i.form).length;
              break;
            case "function":
              n = r.depends.call(i, i)
          }
          n ? e[s] = void 0 !== r.param ? r.param : !0 : delete e[s]
        }
      }), t.each(e, function(s, r) {
        e[s] = t.isFunction(r) ? r(i) : r
      }), t.each(["minlength", "maxlength"], function() {
        e[this] && (e[this] = Number(e[this]))
      }), t.each(["rangelength", "range"], function() {
        var i;
        e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
      }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
    },
    normalizeRule: function(e) {
      if ("string" == typeof e) {
        var i = {};
        t.each(e.split(/\s/), function() {
          i[this] = !0
        }), e = i
      }
      return e
    },
    addMethod: function(e, i, s) {
      t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== s ? s : t.validator.messages[e], 3 > i.length && t.validator.addClassRules(e, t.validator.normalizeRule(e))
    },
    methods: {
      required: function(e, i, s) {
        if (!this.depend(s, i)) return "dependency-mismatch";
        if ("select" === i.nodeName.toLowerCase()) {
          var r = t(i).val();
          return r && r.length > 0
        }
        return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0
      },
      email: function(t, e) {
        return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
      },
      url: function(t, e) {
        return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
      },
      date: function(t, e) {
        return this.optional(e) || !/Invalid|NaN/.test("" + new Date(t))
      },
      dateISO: function(t, e) {
        return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
      },
      number: function(t, e) {
        return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
      },
      digits: function(t, e) {
        return this.optional(e) || /^\d+$/.test(t)
      },
      creditcard: function(t, e) {
        if (this.optional(e)) return "dependency-mismatch";
        if (/[^0-9 \-]+/.test(t)) return !1;
        var i = 0,
          s = 0,
          r = !1;
        t = t.replace(/\D/g, "");
        for (var n = t.length - 1; n >= 0; n--) {
          var a = t.charAt(n);
          s = parseInt(a, 10), r && (s *= 2) > 9 && (s -= 9), i += s, r = !r
        }
        return 0 === i % 10
      },
      minlength: function(e, i, s) {
        var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
        return this.optional(i) || r >= s
      },
      maxlength: function(e, i, s) {
        var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
        return this.optional(i) || s >= r
      },
      rangelength: function(e, i, s) {
        var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
        return this.optional(i) || r >= s[0] && s[1] >= r
      },
      min: function(t, e, i) {
        return this.optional(e) || t >= i
      },
      max: function(t, e, i) {
        return this.optional(e) || i >= t
      },
      range: function(t, e, i) {
        return this.optional(e) || t >= i[0] && i[1] >= t
      },
      equalTo: function(e, i, s) {
        var r = t(s);
        return this.settings.onfocusout && r.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
          t(i).valid()
        }), e === r.val()
      },
      remote: function(e, i, s) {
        if (this.optional(i)) return "dependency-mismatch";
        var r = this.previousValue(i);
        if (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), r.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = r.message, s = "string" == typeof s && {
            url: s
          } || s, r.old === e) return r.valid;
        r.old = e;
        var n = this;
        this.startRequest(i);
        var a = {};
        return a[i.name] = e, t.ajax(t.extend(!0, {
          url: s,
          mode: "abort",
          port: "validate" + i.name,
          dataType: "json",
          data: a,
          success: function(s) {
            n.settings.messages[i.name].remote = r.originalMessage;
            var a = s === !0 || "true" === s;
            if (a) {
              var u = n.formSubmitted;
              n.prepareElement(i), n.formSubmitted = u, n.successList.push(i), delete n.invalid[i.name], n.showErrors()
            } else {
              var o = {},
                l = s || n.defaultMessage(i, "remote");
              o[i.name] = r.message = t.isFunction(l) ? l(e) : l, n.invalid[i.name] = !0, n.showErrors(o)
            }
            r.valid = a, n.stopRequest(i, a)
          }
        }, s)), "pending"
      }
    }
  }), t.format = t.validator.format
})(jQuery),
function(t) {
  var e = {};
  if (t.ajaxPrefilter) t.ajaxPrefilter(function(t, i, s) {
    var r = t.port;
    "abort" === t.mode && (e[r] && e[r].abort(), e[r] = s)
  });
  else {
    var i = t.ajax;
    t.ajax = function(s) {
      var r = ("mode" in s ? s : t.ajaxSettings).mode,
        n = ("port" in s ? s : t.ajaxSettings).port;
      return "abort" === r ? (e[n] && e[n].abort(), e[n] = i.apply(this, arguments), e[n]) : i.apply(this, arguments)
    }
  }
}(jQuery),
function(t) {
  t.extend(t.fn, {
    validateDelegate: function(e, i, s) {
      return this.bind(i, function(i) {
        var r = t(i.target);
        return r.is(e) ? s.apply(r, arguments) : void 0
      })
    }
  })
}(jQuery);

// --- file[jquery.appear.js] ---
/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
! function(e) {
  e.fn.appear = function(a, r) {
    var n = e.extend({
      data: void 0,
      one: !0,
      accX: 0,
      accY: 0
    }, r);
    return this.each(function() {
      var r = e(this);
      if (r.appeared = !1, !a) return void r.trigger("appear", n.data);
      var p = e(window),
        t = function() {
          if (!r.is(":visible")) return void(r.appeared = !1);
          var e = p.scrollLeft(),
            a = p.scrollTop(),
            t = r.offset(),
            c = t.left,
            i = t.top,
            o = n.accX,
            f = n.accY,
            s = r.height(),
            u = p.height(),
            d = r.width(),
            l = p.width();
          i + s + f >= a && a + u + f >= i && c + d + o >= e && e + l + o >= c ? r.appeared || r.trigger("appear", n.data) : r.appeared = !1
        },
        c = function() {
          if (r.appeared = !0, n.one) {
            p.unbind("scroll", t);
            var c = e.inArray(t, e.fn.appear.checks);
            c >= 0 && e.fn.appear.checks.splice(c, 1)
          }
          a.apply(this, arguments)
        };
      n.one ? r.one("appear", n.data, c) : r.bind("appear", n.data, c), p.scroll(t), e.fn.appear.checks.push(t), t()
    })
  }, e.extend(e.fn.appear, {
    checks: [],
    timeout: null,
    checkAll: function() {
      var a = e.fn.appear.checks.length;
      if (a > 0)
        for (; a--;) e.fn.appear.checks[a]()
    },
    run: function() {
      e.fn.appear.timeout && clearTimeout(e.fn.appear.timeout), e.fn.appear.timeout = setTimeout(e.fn.appear.checkAll, 20)
    }
  }), e.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(a, r) {
    var n = e.fn[r];
    n && (e.fn[r] = function() {
      var a = n.apply(this, arguments);
      return e.fn.appear.run(), a
    })
  })
}(jQuery);

// --- file[jquery.form.js] ---
/*!
 * jQuery Form Plugin
 * version: 3.32.0-2013.04.09
 * @requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */
! function(e) {
  "use strict";

  function t(t) {
    var r = t.data;
    t.isDefaultPrevented() || (t.preventDefault(), e(this).ajaxSubmit(r))
  }

  function r(t) {
    var r = t.target,
      a = e(r);
    if (!a.is("[type=submit],[type=image]")) {
      var n = a.closest("[type=submit]");
      if (0 === n.length) return;
      r = n[0]
    }
    var i = this;
    if (i.clk = r, "image" == r.type)
      if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;
      else if ("function" == typeof e.fn.offset) {
      var o = a.offset();
      i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top
    } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;
    setTimeout(function() {
      i.clk = i.clk_x = i.clk_y = null
    }, 100)
  }

  function a() {
    if (e.fn.ajaxSubmit.debug) {
      var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
      window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
    }
  }
  var n = {};
  n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData;
  var i = !!e.fn.prop;
  e.fn.attr2 = function() {
    if (!i) return this.attr.apply(this, arguments);
    var e = this.prop.apply(this, arguments);
    return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
  }, e.fn.ajaxSubmit = function(t) {
    function r(t) {
      var r, a, n = e.param(t).split("&"),
        i = n.length,
        o = [];
      for (r = 0; i > r; r++) n[r] = n[r].replace(/\+/g, " "), a = n[r].split("="), o.push([decodeURIComponent(a[0]), decodeURIComponent(a[1])]);
      return o
    }

    function o(a) {
      for (var n = new FormData, i = 0; i < a.length; i++) n.append(a[i].name, a[i].value);
      if (t.extraData) {
        var o = r(t.extraData);
        for (i = 0; i < o.length; i++) o[i] && n.append(o[i][0], o[i][1])
      }
      t.data = null;
      var s = e.extend(!0, {}, e.ajaxSettings, t, {
        contentType: !1,
        processData: !1,
        cache: !1,
        type: u || "POST"
      });
      t.uploadProgress && (s.xhr = function() {
        var e = jQuery.ajaxSettings.xhr();
        return e.upload && e.upload.addEventListener("progress", function(e) {
          var r = 0,
            a = e.loaded || e.position,
            n = e.total;
          e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r)
        }, !1), e
      }), s.data = null;
      var l = s.beforeSend;
      return s.beforeSend = function(e, t) {
        t.data = n, l && l.call(this, e, t)
      }, e.ajax(s)
    }

    function s(r) {
      function n(e) {
        var t = null;
        try {
          e.contentWindow && (t = e.contentWindow.document)
        } catch (r) {
          a("cannot get iframe.contentWindow document: " + r)
        }
        if (t) return t;
        try {
          t = e.contentDocument ? e.contentDocument : e.document
        } catch (r) {
          a("cannot get iframe.contentDocument: " + r), t = e.document
        }
        return t
      }

      function o() {
        function t() {
          try {
            var e = n(g).readyState;
            a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
          } catch (r) {
            a("Server abort: ", r, " (", r.name, ")"), s(D), j && clearTimeout(j), j = void 0
          }
        }
        var r = f.attr2("target"),
          i = f.attr2("action");
        w.setAttribute("target", p), u || w.setAttribute("method", "POST"), i != m.url && w.setAttribute("action", m.url), m.skipEncodingOverride || u && !/post/i.test(u) || f.attr({
          encoding: "multipart/form-data",
          enctype: "multipart/form-data"
        }), m.timeout && (j = setTimeout(function() {
          T = !0, s(k)
        }, m.timeout));
        var o = [];
        try {
          if (m.extraData)
            for (var l in m.extraData) m.extraData.hasOwnProperty(l) && o.push(e.isPlainObject(m.extraData[l]) && m.extraData[l].hasOwnProperty("name") && m.extraData[l].hasOwnProperty("value") ? e('<input type="hidden" name="' + m.extraData[l].name + '">').val(m.extraData[l].value).appendTo(w)[0] : e('<input type="hidden" name="' + l + '">').val(m.extraData[l]).appendTo(w)[0]);
          m.iframeTarget || (v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1)), setTimeout(t, 15);
          try {
            w.submit()
          } catch (c) {
            var d = document.createElement("form").submit;
            d.apply(w)
          }
        } finally {
          w.setAttribute("action", i), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(o).remove()
        }
      }

      function s(t) {
        if (!x.aborted && !F) {
          if (M = n(g), M || (a("cannot access response document"), t = D), t === k && x) return x.abort("timeout"), void S.reject(x, "timeout");
          if (t == D && x) return x.abort("server abort"), void S.reject(x, "error", "server abort");
          if (M && M.location.href != m.iframeSrc || T) {
            g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1);
            var r, i = "success";
            try {
              if (T) throw "timeout";
              var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M);
              if (a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O) return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250);
              var u = M.body ? M.body : M.documentElement;
              x.responseText = u ? u.innerHTML : null, x.responseXML = M.XMLDocument ? M.XMLDocument : M, o && (m.dataType = "xml"), x.getResponseHeader = function(e) {
                var t = {
                  "content-type": m.dataType
                };
                return t[e]
              }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);
              var l = (m.dataType || "").toLowerCase(),
                c = /(json|script|text)/.test(l);
              if (c || m.textarea) {
                var f = M.getElementsByTagName("textarea")[0];
                if (f) x.responseText = f.value, x.status = Number(f.getAttribute("status")) || x.status, x.statusText = f.getAttribute("statusText") || x.statusText;
                else if (c) {
                  var p = M.getElementsByTagName("pre")[0],
                    h = M.getElementsByTagName("body")[0];
                  p ? x.responseText = p.textContent ? p.textContent : p.innerText : h && (x.responseText = h.textContent ? h.textContent : h.innerText)
                }
              } else "xml" == l && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText));
              try {
                L = _(x, l, m)
              } catch (b) {
                i = "parsererror", x.error = r = b || i
              }
            } catch (b) {
              a("error caught: ", b), i = "error", x.error = r = b || i
            }
            x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && x.status < 300 || 304 === x.status ? "success" : "error"), "success" === i ? (m.success && m.success.call(m.context, L, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, m])) : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, m, r])), d && e.event.trigger("ajaxComplete", [x, m]), d && !--e.active && e.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, x, i), F = !0, m.timeout && clearTimeout(j), setTimeout(function() {
              m.iframeTarget || v.remove(), x.responseXML = null
            }, 100)
          }
        }
      }
      var l, c, m, d, p, v, g, x, b, y, T, j, w = f[0],
        S = e.Deferred();
      if (r)
        for (c = 0; c < h.length; c++) l = e(h[c]), i ? l.prop("disabled", !1) : l.removeAttr("disabled");
      if (m = e.extend(!0, {}, e.ajaxSettings, t), m.context = m.context || m, p = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (v = e(m.iframeTarget), y = v.attr2("name"), y ? p = y : v.attr2("name", p)) : (v = e('<iframe name="' + p + '" src="' + m.iframeSrc + '" />'), v.css({
          position: "absolute",
          top: "-1000px",
          left: "-1000px"
        })), g = v[0], x = {
          aborted: 0,
          responseText: null,
          responseXML: null,
          status: 0,
          statusText: "n/a",
          getAllResponseHeaders: function() {},
          getResponseHeader: function() {},
          setRequestHeader: function() {},
          abort: function(t) {
            var r = "timeout" === t ? "timeout" : "aborted";
            a("aborting upload... " + r), this.aborted = 1;
            try {
              g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop")
            } catch (n) {}
            v.attr("src", m.iframeSrc), x.error = r, m.error && m.error.call(m.context, x, r, t), d && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r)
          }
        }, d = m.global, d && 0 === e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, m]), m.beforeSend && m.beforeSend.call(m.context, x, m) === !1) return m.global && e.active--, S.reject(), S;
      if (x.aborted) return S.reject(), S;
      b = w.clk, b && (y = b.name, y && !b.disabled && (m.extraData = m.extraData || {}, m.extraData[y] = b.value, "image" == b.type && (m.extraData[y + ".x"] = w.clk_x, m.extraData[y + ".y"] = w.clk_y)));
      var k = 1,
        D = 2,
        A = e("meta[name=csrf-token]").attr("content"),
        E = e("meta[name=csrf-param]").attr("content");
      E && A && (m.extraData = m.extraData || {}, m.extraData[E] = A), m.forceSync ? o() : setTimeout(o, 10);
      var L, M, F, O = 50,
        X = e.parseXML || function(e, t) {
          return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
        },
        C = e.parseJSON || function(e) {
          return window.eval("(" + e + ")")
        },
        _ = function(t, r, a) {
          var n = t.getResponseHeader("content-type") || "",
            i = "xml" === r || !r && n.indexOf("xml") >= 0,
            o = i ? t.responseXML : t.responseText;
          return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o
        };
      return S
    }
    if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;
    var u, l, c, f = this;
    "function" == typeof t && (t = {
      success: t
    }), u = this.attr2("method"), l = this.attr2("action"), c = "string" == typeof l ? e.trim(l) : "", c = c || window.location.href || "", c && (c = (c.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
      url: c,
      success: e.ajaxSettings.success,
      type: u || "GET",
      iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
    }, t);
    var m = {};
    if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
    if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
    var d = t.traditional;
    void 0 === d && (d = e.ajaxSettings.traditional);
    var p, h = [],
      v = this.formToArray(t.semantic, h);
    if (t.data && (t.extraData = t.data, p = e.param(t.data, d)), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
    if (this.trigger("form-submit-validate", [v, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
    var g = e.param(v, d);
    p && (g = g ? g + "&" + p : p), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g;
    var x = [];
    if (t.resetForm && x.push(function() {
        f.resetForm()
      }), t.clearForm && x.push(function() {
        f.clearForm(t.includeHidden)
      }), !t.dataType && t.target) {
      var b = t.success || function() {};
      x.push(function(r) {
        var a = t.replaceTarget ? "replaceWith" : "html";
        e(t.target)[a](r).each(b, arguments)
      })
    } else t.success && x.push(t.success);
    t.success = function(e, r, a) {
      for (var n = t.context || this, i = 0, o = x.length; o > i; i++) x[i].apply(n, [e, r, a || f, f])
    };
    var y = e('input[type=file]:enabled[value!=""]', this),
      T = y.length > 0,
      j = "multipart/form-data",
      w = f.attr("enctype") == j || f.attr("encoding") == j,
      S = n.fileapi && n.formdata;
    a("fileAPI :" + S);
    var k, D = (T || w) && !S;
    t.iframe !== !1 && (t.iframe || D) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function() {
      k = s(v)
    }) : k = s(v) : k = (T || w) && S ? o(v) : e.ajax(t), f.removeData("jqxhr").data("jqxhr", k);
    for (var A = 0; A < h.length; A++) h[A] = null;
    return this.trigger("form-submit-notify", [this, t]), this
  }, e.fn.ajaxForm = function(n) {
    if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
      var i = {
        s: this.selector,
        c: this.context
      };
      return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function() {
        e(i.s, i.c).ajaxForm(n)
      }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
    }
    return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r)
  }, e.fn.ajaxFormUnbind = function() {
    return this.unbind("submit.form-plugin click.form-plugin")
  }, e.fn.formToArray = function(t, r) {
    var a = [];
    if (0 === this.length) return a;
    var i = this[0],
      o = t ? i.getElementsByTagName("*") : i.elements;
    if (!o) return a;
    var s, u, l, c, f, m, d;
    for (s = 0, m = o.length; m > s; s++)
      if (f = o[s], l = f.name, l && !f.disabled)
        if (t && i.clk && "image" == f.type) i.clk == f && (a.push({
          name: l,
          value: e(f).val(),
          type: f.type
        }), a.push({
          name: l + ".x",
          value: i.clk_x
        }, {
          name: l + ".y",
          value: i.clk_y
        }));
        else if (c = e.fieldValue(f, !0), c && c.constructor == Array)
      for (r && r.push(f), u = 0, d = c.length; d > u; u++) a.push({
        name: l,
        value: c[u]
      });
    else if (n.fileapi && "file" == f.type) {
      r && r.push(f);
      var p = f.files;
      if (p.length)
        for (u = 0; u < p.length; u++) a.push({
          name: l,
          value: p[u],
          type: f.type
        });
      else a.push({
        name: l,
        value: "",
        type: f.type
      })
    } else null !== c && "undefined" != typeof c && (r && r.push(f), a.push({
      name: l,
      value: c,
      type: f.type,
      required: f.required
    }));
    if (!t && i.clk) {
      var h = e(i.clk),
        v = h[0];
      l = v.name, l && !v.disabled && "image" == v.type && (a.push({
        name: l,
        value: h.val()
      }), a.push({
        name: l + ".x",
        value: i.clk_x
      }, {
        name: l + ".y",
        value: i.clk_y
      }))
    }
    return a
  }, e.fn.formSerialize = function(t) {
    return e.param(this.formToArray(t))
  }, e.fn.fieldSerialize = function(t) {
    var r = [];
    return this.each(function() {
      var a = this.name;
      if (a) {
        var n = e.fieldValue(this, t);
        if (n && n.constructor == Array)
          for (var i = 0, o = n.length; o > i; i++) r.push({
            name: a,
            value: n[i]
          });
        else null !== n && "undefined" != typeof n && r.push({
          name: this.name,
          value: n
        })
      }
    }), e.param(r)
  }, e.fn.fieldValue = function(t) {
    for (var r = [], a = 0, n = this.length; n > a; a++) {
      var i = this[a],
        o = e.fieldValue(i, t);
      null === o || "undefined" == typeof o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o))
    }
    return r
  }, e.fieldValue = function(t, r) {
    var a = t.name,
      n = t.type,
      i = t.tagName.toLowerCase();
    if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null;
    if ("select" == i) {
      var o = t.selectedIndex;
      if (0 > o) return null;
      for (var s = [], u = t.options, l = "select-one" == n, c = l ? o + 1 : u.length, f = l ? o : 0; c > f; f++) {
        var m = u[f];
        if (m.selected) {
          var d = m.value;
          if (d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), l) return d;
          s.push(d)
        }
      }
      return s
    }
    return e(t).val()
  }, e.fn.clearForm = function(t) {
    return this.each(function() {
      e("input,select,textarea", this).clearFields(t)
    })
  }, e.fn.clearFields = e.fn.clearInputs = function(t) {
    var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
    return this.each(function() {
      var a = this.type,
        n = this.tagName.toLowerCase();
      r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "")
    })
  }, e.fn.resetForm = function() {
    return this.each(function() {
      ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
    })
  }, e.fn.enable = function(e) {
    return void 0 === e && (e = !0), this.each(function() {
      this.disabled = !e
    })
  }, e.fn.selected = function(t) {
    return void 0 === t && (t = !0), this.each(function() {
      var r = this.type;
      if ("checkbox" == r || "radio" == r) this.checked = t;
      else if ("option" == this.tagName.toLowerCase()) {
        var a = e(this).parent("select");
        t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t
      }
    })
  }, e.fn.ajaxSubmit.debug = !1
}(jQuery);
