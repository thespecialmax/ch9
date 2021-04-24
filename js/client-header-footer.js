// Transition

(function (k) {
	k.transit = {
		version: "0.9.9",
		propertyMap: {
			marginLeft: "margin",
			marginRight: "margin",
			marginBottom: "margin",
			marginTop: "margin",
			paddingLeft: "padding",
			paddingRight: "padding",
			paddingBottom: "padding",
			paddingTop: "padding"
		},
		enabled: true,
		useTransitionEnd: false
	};
	var d = document.createElement("div");
	var q = {};

	function b(v) {
		if (v in d.style) {
			return v
		}
		var u = ["Moz", "Webkit", "O", "ms"];
		var r = v.charAt(0).toUpperCase() + v.substr(1);
		if (v in d.style) {
			return v
		}
		for (var t = 0; t < u.length; ++t) {
			var s = u[t] + r;
			if (s in d.style) {
				return s
			}
		}
	}

	function e() {
		d.style[q.transform] = "";
		d.style[q.transform] = "rotateY(90deg)";
		return d.style[q.transform] !== ""
	}
	var a = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
	q.transition = b("transition");
	q.transitionDelay = b("transitionDelay");
	q.transform = b("transform");
	q.transformOrigin = b("transformOrigin");
	q.transform3d = e();
	var i = {
		transition: "transitionEnd",
		MozTransition: "transitionend",
		OTransition: "oTransitionEnd",
		WebkitTransition: "webkitTransitionEnd",
		msTransition: "MSTransitionEnd"
	};
	var f = q.transitionEnd = i[q.transition] || null;
	for (var p in q) {
		if (q.hasOwnProperty(p) && typeof k.support[p] === "undefined") {
			k.support[p] = q[p]
		}
	}
	d = null;
	k.cssEase = {
		_default: "ease",
		"in": "ease-in",
		out: "ease-out",
		"in-out": "ease-in-out",
		snap: "cubic-bezier(0,1,.5,1)",
		easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
		easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
		easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
		easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
		easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
		easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
		easeOutExpo: "cubic-bezier(.19,1,.22,1)",
		easeInOutExpo: "cubic-bezier(1,0,0,1)",
		easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
		easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
		easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
		easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
		easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
		easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
		easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
		easeOutQuint: "cubic-bezier(.23,1,.32,1)",
		easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
		easeInSine: "cubic-bezier(.47,0,.745,.715)",
		easeOutSine: "cubic-bezier(.39,.575,.565,1)",
		easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
		easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
		easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
		easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
	};
	k.cssHooks["transit:transform"] = {
		get: function (r) {
			return k(r).data("transform") || new j()
		},
		set: function (s, r) {
			var t = r;
			if (!(t instanceof j)) {
				t = new j(t)
			}
			if (q.transform === "WebkitTransform" && !a) {
				s.style[q.transform] = t.toString(true)
			} else {
				s.style[q.transform] = t.toString()
			}
			k(s).data("transform", t)
		}
	};
	k.cssHooks.transform = {
		set: k.cssHooks["transit:transform"].set
	};
	if (k.fn.jquery < "1.8") {
		k.cssHooks.transformOrigin = {
			get: function (r) {
				return r.style[q.transformOrigin]
			},
			set: function (r, s) {
				r.style[q.transformOrigin] = s
			}
		};
		k.cssHooks.transition = {
			get: function (r) {
				return r.style[q.transition]
			},
			set: function (r, s) {
				r.style[q.transition] = s
			}
		}
	}
	n("scale");
	n("translate");
	n("rotate");
	n("rotateX");
	n("rotateY");
	n("rotate3d");
	n("perspective");
	n("skewX");
	n("skewY");
	n("x", true);
	n("y", true);

	function j(r) {
		if (typeof r === "string") {
			this.parse(r)
		}
		return this
	}
	j.prototype = {
		setFromString: function (t, s) {
			var r = (typeof s === "string") ? s.split(",") : (s.constructor === Array) ? s : [s];
			r.unshift(t);
			j.prototype.set.apply(this, r)
		},
		set: function (s) {
			var r = Array.prototype.slice.apply(arguments, [1]);
			if (this.setter[s]) {
				this.setter[s].apply(this, r)
			} else {
				this[s] = r.join(",")
			}
		},
		get: function (r) {
			if (this.getter[r]) {
				return this.getter[r].apply(this)
			} else {
				return this[r] || 0
			}
		},
		setter: {
			rotate: function (r) {
				this.rotate = o(r, "deg")
			},
			rotateX: function (r) {
				this.rotateX = o(r, "deg")
			},
			rotateY: function (r) {
				this.rotateY = o(r, "deg")
			},
			scale: function (r, s) {
				if (s === undefined) {
					s = r
				}
				this.scale = r + "," + s
			},
			skewX: function (r) {
				this.skewX = o(r, "deg")
			},
			skewY: function (r) {
				this.skewY = o(r, "deg")
			},
			perspective: function (r) {
				this.perspective = o(r, "px")
			},
			x: function (r) {
				this.set("translate", r, null)
			},
			y: function (r) {
				this.set("translate", null, r)
			},
			translate: function (r, s) {
				if (this._translateX === undefined) {
					this._translateX = 0
				}
				if (this._translateY === undefined) {
					this._translateY = 0
				}
				if (r !== null && r !== undefined) {
					this._translateX = o(r, "px")
				}
				if (s !== null && s !== undefined) {
					this._translateY = o(s, "px")
				}
				this.translate = this._translateX + "," + this._translateY
			}
		},
		getter: {
			x: function () {
				return this._translateX || 0
			},
			y: function () {
				return this._translateY || 0
			},
			scale: function () {
				var r = (this.scale || "1,1").split(",");
				if (r[0]) {
					r[0] = parseFloat(r[0])
				}
				if (r[1]) {
					r[1] = parseFloat(r[1])
				}
				return (r[0] === r[1]) ? r[0] : r
			},
			rotate3d: function () {
				var t = (this.rotate3d || "0,0,0,0deg").split(",");
				for (var r = 0; r <= 3; ++r) {
					if (t[r]) {
						t[r] = parseFloat(t[r])
					}
				}
				if (t[3]) {
					t[3] = o(t[3], "deg")
				}
				return t
			}
		},
		parse: function (s) {
			var r = this;
			s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function (t, v, u) {
				r.setFromString(v, u)
			})
		},
		toString: function (t) {
			var s = [];
			for (var r in this) {
				if (this.hasOwnProperty(r)) {
					if ((!q.transform3d) && ((r === "rotateX") || (r === "rotateY") || (r === "perspective") || (r === "transformOrigin"))) {
						continue
					}
					if (r[0] !== "_") {
						if (t && (r === "scale")) {
							s.push(r + "3d(" + this[r] + ",1)")
						} else {
							if (t && (r === "translate")) {
								s.push(r + "3d(" + this[r] + ",0)")
							} else {
								s.push(r + "(" + this[r] + ")")
							}
						}
					}
				}
			}
			return s.join(" ")
		}
	};

	function m(s, r, t) {
		if (r === true) {
			s.queue(t)
		} else {
			if (r) {
				s.queue(r, t)
			} else {
				t()
			}
		}
	}

	function h(s) {
		var r = [];
		k.each(s, function (t) {
			t = k.camelCase(t);
			t = k.transit.propertyMap[t] || k.cssProps[t] || t;
			t = c(t);
			if (k.inArray(t, r) === -1) {
				r.push(t)
			}
		});
		return r
	}

	function g(s, v, x, r) {
		var t = h(s);
		if (k.cssEase[x]) {
			x = k.cssEase[x]
		}
		var w = "" + l(v) + " " + x;
		if (parseInt(r, 10) > 0) {
			w += " " + l(r)
		}
		var u = [];
		k.each(t, function (z, y) {
			u.push(y + " " + w)
		});
		return u.join(", ")
	}
	k.fn.transition = k.fn.transit = function (z, s, y, C) {
		var D = this;
		var u = 0;
		var w = true;
		if (typeof s === "function") {
			C = s;
			s = undefined
		}
		if (typeof y === "function") {
			C = y;
			y = undefined
		}
		if (typeof z.easing !== "undefined") {
			y = z.easing;
			delete z.easing
		}
		if (typeof z.duration !== "undefined") {
			s = z.duration;
			delete z.duration
		}
		if (typeof z.complete !== "undefined") {
			C = z.complete;
			delete z.complete
		}
		if (typeof z.queue !== "undefined") {
			w = z.queue;
			delete z.queue
		}
		if (typeof z.delay !== "undefined") {
			u = z.delay;
			delete z.delay
		}
		if (typeof s === "undefined") {
			s = k.fx.speeds._default
		}
		if (typeof y === "undefined") {
			y = k.cssEase._default
		}
		s = l(s);
		var E = g(z, s, y, u);
		var B = k.transit.enabled && q.transition;
		var t = B ? (parseInt(s, 10) + parseInt(u, 10)) : 0;
		if (t === 0) {
			var A = function (F) {
				D.css(z);
				if (C) {
					C.apply(D)
				}
				if (F) {
					F()
				}
			};
			m(D, w, A);
			return D
		}
		var x = {};
		var r = function (H) {
			var G = false;
			var F = function () {
				if (G) {
					D.unbind(f, F)
				}
				if (t > 0) {
					D.each(function () {
						this.style[q.transition] = (x[this] || null)
					})
				}
				if (typeof C === "function") {
					C.apply(D)
				}
				if (typeof H === "function") {
					H()
				}
			};
			if ((t > 0) && (f) && (k.transit.useTransitionEnd)) {
				G = true;
				D.bind(f, F)
			} else {
				window.setTimeout(F, t)
			}
			D.each(function () {
				if (t > 0) {
					this.style[q.transition] = E
				}
				k(this).css(z)
			})
		};
		var v = function (F) {
			this.offsetWidth;
			r(F)
		};
		m(D, w, v);
		return this
	};

	function n(s, r) {
		if (!r) {
			k.cssNumber[s] = true
		}
		k.transit.propertyMap[s] = q.transform;
		k.cssHooks[s] = {
			get: function (v) {
				var u = k(v).css("transit:transform");
				return u.get(s)
			},
			set: function (v, w) {
				var u = k(v).css("transit:transform");
				u.setFromString(s, w);
				k(v).css({
					"transit:transform": u
				})
			}
		}
	}

	function c(r) {
		return r.replace(/([A-Z])/g, function (s) {
			return "-" + s.toLowerCase()
		})
	}

	function o(s, r) {
		if ((typeof s === "string") && (!s.match(/^[\-0-9\.]+$/))) {
			return s
		} else {
			return "" + s + r
		}
	}

	function l(s) {
		var r = s;
		if (k.fx.speeds[r]) {
			r = k.fx.speeds[r]
		}
		return o(r, "ms")
	}
	k.transit.getTransitionValue = g
})(jQuery);


; (function ($) {
	"use strict";

	var methods = (function () {
		// private properties and methods go here
		var c = {
			bcClass: 'sf-breadcrumb',
			menuClass: 'sf-js-enabled',
			anchorClass: 'sf-with-ul',
			menuArrowClass: 'sf-arrows'
		},
			ios = (function () {
				var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
				if (ios) {
					// tap anywhere on iOS to unfocus a submenu
					$('html').css('cursor', 'pointer').on('click', $.noop);
				}
				return ios;
			})(),
			wp7 = (function () {
				var style = document.documentElement.style;
				return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
			})(),
			toggleMenuClasses = function ($menu, o) {
				var classes = c.menuClass;
				if (o.cssArrows) {
					classes += ' ' + c.menuArrowClass;
				}
				$menu.toggleClass(classes);
			},
			setPathToCurrent = function ($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
					.filter(function () {
						return ($(this).children(o.popUpSelector).hide().show().length);
					}).removeClass(o.pathClass);
			},
			toggleAnchorClass = function ($li) {
				$li.children('a').toggleClass(c.anchorClass);
			},
			toggleTouchAction = function ($menu) {
				var touchAction = $menu.css('ms-touch-action');
				touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
				$menu.css('ms-touch-action', touchAction);
			},
			applyHandlers = function ($menu, o) {
				var targets = 'li:has(' + o.popUpSelector + ')';
				if ($.fn.hoverIntent && !o.disableHI) {
					$menu.hoverIntent(over, out, targets);
				}
				else {
					$menu
						.on('mouseenter.superfish', targets, over)
						.on('mouseleave.superfish', targets, out);
				}
				var touchevent = 'MSPointerDown.superfish';
				if (!ios) {
					touchevent += ' touchend.superfish';
				}
				if (wp7) {
					touchevent += ' mousedown.superfish';
				}
				$menu
					.on('focusin.superfish', 'li', over)
					.on('focusout.superfish', 'li', out)
					.on(touchevent, 'a', o, touchHandler);
			},
			touchHandler = function (e) {
				var $this = $(this),
					$ul = $this.siblings(e.data.popUpSelector);

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.one('click.superfish', false);
					if (e.type === 'MSPointerDown') {
						$this.trigger('focus');
					} else {
						$.proxy(over, $this.parent('li'))();
					}
				}
			},
			over = function () {
				var $this = $(this),
					o = getOptions($this);

				if ($(this).parents('.megamenu').length > 0) return;

				clearTimeout(o.sfTimer);
				$this.siblings().superfish('hide').end().superfish('show');
			},
			out = function () {
				var $this = $(this),
					o = getOptions($this);
				if (ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function (o) {
				o.retainPath = ($.inArray(this[0], o.$path) > -1);
				this.superfish('hide');

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function ($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function ($el) {
				return getMenu($el).data('sf-options');
			};

		return {
			// public methods
			hide: function (instant) {
				if (this.length) {
					var $this = this,
						o = getOptions($this);
					if (!o) {
						return this;
					}

					if ($(this).hasClass('menu-item-over') && $(this).hasClass('megamenu')) {
						return true;
					}

					var not = (o.retainPath === true) ? o.$path : '',
						$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
						speed = o.speedOut;

					if (instant) {
						$ul.show();
						speed = 0;
					}
					o.retainPath = false;
					o.onBeforeHide.call($ul);

					if (o.dropdownStyle == 'minimal') {
						var $this = $(this);
						o.onHide.call($this);
					} else {

						$ul.stop(true, true).animate(o.animationOut, speed, function () {
							var $this = $(this);
							o.onHide.call($this);
						});
					}

					if ($(this).parents('.megamenu').length > 0) return;

					//megamenu removes transparent option
					if ($('#header-outer[data-megamenu-rt="1"]').length > 0 && $('#header-outer[data-transparent-header="true"]').length > 0) {

						if ($('#header-outer.scrolled-down').length == 0 && $('#header-outer.small-nav').length == 0 && $('#header-outer.detached').length == 0 && $('#header-outer.fixed-menu').length == 0) {
							$('#header-outer').addClass('transparent');
						}
						if ($('#header-outer[data-permanent-transparent="1"][data-transparent-header="true"]').length > 0) {
							$('#header-outer').addClass('transparent');
						}

					}
				}
				return this;
			},
			show: function () {

				if ($(this).parents('.megamenu').length > 0) return;

				var o = getOptions(this);
				if (!o) {
					return this;
				}
				var $this = this.addClass(o.hoverClass),
					$ul = $this.children(o.popUpSelector);


				//megamenu removes transparent option
				if ($('#header-outer[data-megamenu-rt="1"]').length > 0 && $(this).hasClass('megamenu') && $('#header-outer').attr('data-transparent-header') == 'true') {

					$('#header-outer').addClass('no-transition');
					$('#header-outer').removeClass('transparent');

				}

				o.onBeforeShow.call($ul);


				//make sure the ul has space 
				if (!$($ul).parents('li').hasClass('megamenu') && !$($ul).parents('ul').hasClass('sub-menu') && $ul.offset()) {

					$ul.addClass('temp-hidden-display');
					var docW = $("#top .container").width();
					var elm = $ul;
					var off = elm.offset();
					var l = off.left - ($(window).width() - docW) / 2;
					var w = elm.width();
					var isEntirelyVisible = (l + w <= $(window).width() - 100);

					if (!isEntirelyVisible) {
						$ul.parents('li').addClass('edge');
					} else {
						$ul.parents('li').removeClass('edge');
					}
					$ul.removeClass('temp-hidden-display');

				}

				if (o.dropdownStyle == 'minimal') {
					o.onShow.call($ul);
				} else {
					$ul.stop(true, true).animate(o.animation, o.speed, function () {
						o.onShow.call($ul);
					});
				}

				//show on left class
				if ($ul.length > 0 && $ul.parents('.sub-menu').length > 0 && $ul.parents('.sf-menu').length > 0) {
					if ($ul.offset().left + $ul.outerWidth() > $(window).width()) {
						$ul.addClass('on-left-side');
						$ul.find('ul').addClass('on-left-side');
					}
				}


				return this;
			},
			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						o = $this.data('sf-options'),
						$hasPopUp;
					if (!o) {
						return false;
					}
					$hasPopUp = $this.find(o.popUpSelector).parent('li');
					clearTimeout(o.sfTimer);
					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					// remove event handlers
					$this.off('.superfish').off('.hoverIntent');
					// clear animation's inline display style
					$hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
						return style.replace(/display[^;]+;?/g, '');
					});
					// reset 'current' path classes
					o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
					$this.find('.' + o.hoverClass).removeClass(o.hoverClass);
					o.onDestroy.call($this);
					$this.removeData('sf-options');
				});
			},
			init: function (op) {
				return this.each(function () {
					var $this = $(this);
					if ($this.data('sf-options')) {
						return false;
					}
					var o = $.extend({}, $.fn.superfish.defaults, op),
						$hasPopUp = $this.find(o.popUpSelector).parent('li');
					o.$path = setPathToCurrent($this, o);

					$this.data('sf-options', o);

					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					applyHandlers($this, o);

					$hasPopUp.not('.' + c.bcClass).superfish('hide', true);

					o.onInit.call(this);
				});
			}
		};
	})();

	$.fn.superfish = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' + method + ' does not exist on jQuery.fn.superfish');
		}
	};

	$.fn.superfish.defaults = {
		popUpSelector: 'ul,.sf-mega', // within menu context
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: { opacity: 'show' },
		animationOut: { opacity: 'hide' },
		speed: 'normal',
		speedOut: 'fast',
		cssArrows: true,
		disableHI: false,
		onInit: $.noop,
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop,
		onDestroy: $.noop,
		dropdownStyle: ($('div[data-dropdown-style="minimal"]').length > 0) ? 'minimal' : 'classic'
	};

	// soon to be deprecated
	$.fn.extend({
		hideSuperfishUl: methods.hide,
		showSuperfishUl: methods.show
	});

})(jQuery);

// init.js



(function ($, window, document) {

	"use strict";

	// Theme vars.
	var $window = $(window),
		$body = $('body'),
		$offCanvasEl = $('#slide-out-widget-area'),
		$offCanvasBG = $('#slide-out-widget-area-bg'),
		$headerOuterEl = $('#header-outer'),
		$headerSecondaryEl = $('#header-secondary-outer'),
		$searchButtonEl = $('#header-outer #search-btn a'),
		$wpAdminBar = $('#wpadminbar'),
		$loadingScreenEl = $('#ajax-loading-screen'),
		$bodyBorderTop = $('.body-border-top'),
		$pageHeaderBG = $('#page-header-bg'),
		$footerOuterEl = $('#footer-outer'),
		$bodyBorderWidth = ($('.body-border-right').length > 0) ? $('.body-border-right').width() : 0,
		$logoHeight = ($headerOuterEl.is('[data-logo-height]')) ? parseInt($headerOuterEl.attr('data-logo-height')) : 30,
		headerPadding = ($headerOuterEl.is('[data-padding]')) ? parseInt($headerOuterEl.attr('data-padding')) : 28,
		logoShrinkNum = ($headerOuterEl.is('[data-shrink-num]')) ? $headerOuterEl.attr('data-shrink-num') : 6,
		condenseHeaderLayout = ($headerOuterEl.is('[data-condense="true"]')) ? true : false,
		usingLogoImage = ($headerOuterEl.is('[data-using-logo="1"]')) ? true : false,
		headerResize = ($headerOuterEl.is('[data-header-resize="1"]')) ? true : false,


		$liquidBG_EL = [],

		$mouseParallaxScenes = [],

		$bodyBorderHeaderColorMatch = false,
		nectarBoxRoll = {
			animating: 'false',
			perspect: 'not-rolled'
		},

		$nectarFullPage = {
			$usingFullScreenRows: false
		},

		$bodyBorderSizeToRemove;

	if ($bodyBorderTop.length > 0) {

		if ($bodyBorderTop.css('background-color') == '#ffffff' && $body.attr('data-header-color') == 'light' ||
			$bodyBorderTop.css('background-color') == 'rgb(255, 255, 255)' && $body.attr('data-header-color') == 'light' ||
			$bodyBorderTop.css('background-color') == $headerOuterEl.attr('data-user-set-bg')) {
			$bodyBorderHeaderColorMatch = true;
		}

	}



	/**
	* Nectar DOM info helper.
	*
	* @since 9.0
	*/
	var nectarDOMInfo = {

		usingMobileBrowser: (navigator.userAgent.match(/(Android|iPod|iPhone|iPad|BlackBerry|IEMobile|Opera Mini)/)) ? true : false,
		usingFrontEndEditor: (typeof window.vc_iframe === 'undefined') ? false : true,
		getWindowSize: function () {
			nectarDOMInfo.winH = window.innerHeight;
			nectarDOMInfo.winW = window.innerWidth;
			nectarDOMInfo.adminBarHeight = ($wpAdminBar.length > 0) ? $wpAdminBar.height() : 0;
			nectarDOMInfo.secondaryHeaderHeight = ($headerSecondaryEl.length > 0 && $headerSecondaryEl.css('display') != 'none') ? $headerSecondaryEl.outerHeight() : 0;
			nectarDOMInfo.footerOuterHeight = ($footerOuterEl.length > 0) ? $footerOuterEl.outerHeight() : 0;
		},
		scrollTop: 0,
		clientX: 0,
		clientY: 0,
		scrollPosMouse: function () {
			return $window.scrollTop();
		},
		scrollPosRAF: function () {
			nectarDOMInfo.scrollTop = $window.scrollTop();
			requestAnimationFrame(nectarDOMInfo.scrollPosRAF);
		},
		bindEvents: function () {

			if (!nectarDOMInfo.usingMobileBrowser) {
				$window.on('scroll', function () {
					nectarDOMInfo.scrollTop = nectarDOMInfo.scrollPosMouse();
				});
			} else {
				requestAnimationFrame(nectarDOMInfo.scrollPosRAF);
			}

			document.addEventListener("mousemove", function (e) {
				nectarDOMInfo.clientX = e.clientX;
				nectarDOMInfo.clientY = e.clientY;
			});

			$window.on('resize', nectarDOMInfo.getWindowSize);

		},
		init: function () {
			// Re-cache WP admin bar after DOM ready
			$wpAdminBar = $('#wpadminbar');

			// Get values and bind events
			this.getWindowSize();
			this.scrollTop = this.scrollPosMouse();
			this.bindEvents();

			this.usingFrontEndEditor = (typeof window.vc_iframe === 'undefined') ? false : true;
		}

	};




	/**
	* Debounced resize event
	*
	* @since 2.0
	*/

	function smartResizeInit() {

		headerSpace();
		OCM_overflowState();
		showOnLeftSubMenu();
	}



	/**
	* Main resize event.
	*
	* @since 2.0
	*/
	function resizeInit() {

		addOrRemoveSF();



	}





	function setNectarCarouselFlkEH() {
		$('.nectar-carousel.nectar-flickity:not(.masonry)').each(function () {
			nectarCarouselFlkEH($(this));
		});
	}

	/**
	* Superfish initialization and submenu functionality. 
	*
	* @since 2.0
	*/
	function initSF() {

		addOrRemoveSF();

		if ($('div[data-header-format="left-header"]').length == 0) {

			var $disableHI;

			if (!($('#header-outer[data-megamenu-rt="1"]').length > 0 &&
				$('#header-outer[data-transparent-header="true"]').length > 0)) {
				$disableHI = true;
			} else {
				$disableHI = false;
			}

			$(".sf-menu:not(.buttons)").superfish({
				delay: 650,
				speed: 'fast',
				disableHI: $disableHI,
				speedOut: 'fast',
				animation: {
					opacity: 'show'
				}
			});

			// Pull right/left menu
			$('#header-outer .sf-menu.buttons li.menu-item').on('mouseover', function () {
				$(this).addClass('sfHover');
			});
			$('#header-outer .sf-menu.buttons li.menu-item').on('mouseleave', function () {
				var $that = $(this);

				if ($that.is('.menu-item-has-children')) {
					setTimeout(function () {
						if (!$that.is(':hover')) {
							$that.removeClass('sfHover');
						}
					}, 200);
				} else {
					$that.removeClass('sfHover');
				}
			});

			// Areas that do not use megamenu.
			$('#header-secondary-outer li.megamenu, .sf-menu.buttons li.megamenu').removeClass('megamenu');

			$('#header-outer .sf-menu > li:not(.megamenu) > ul > li > ul').each(function () {

				if ($(this).offset().left + $(this).outerWidth() > $window.width()) {
					$(this).addClass('on-left-side');
					$(this).find('ul').addClass('on-left-side');
				}

			});

			// Megamenu multi section per column title support.
			$('body:not([data-header-format="left-header"]) header#top nav > ul > li.megamenu > ul > li > ul > li:has("> ul")').addClass('has-ul');

			// Full width megamenu.
			if ($('div[data-megamenu-width="full-width"]').length > 0 && $('ul.sub-menu').length > 0) {
				megamenuFullwidth();
				$window.on('smartresize', megamenuFullwidth);
				$('header#top nav > ul > li.megamenu > .sub-menu').css('box-sizing', 'content-box');
			}

			// Extra hover class for megamenu check.
			$('header#top nav > ul.sf-menu > li.menu-item').on('mouseenter', function () {
				$(this).addClass('menu-item-over');
			});
			$('header#top nav > ul.sf-menu > li.menu-item').on('mouseleave', function () {
				$(this).removeClass('menu-item-over');
			});

			// Remove arrows on mega menu item.
			$('header#top nav .megamenu .sub-menu a.sf-with-ul .sf-sub-indicator, header#top .megamenu .sub-menu a .sf-sub-indicator').remove();

			// Blank title megamenu columns.
			$('header#top nav > ul > li.megamenu > ul.sub-menu > li > a').each(function () {
				if ($(this).text() == '-' || $(this).text() == '–' || $(this).parent().hasClass('hide-title')) {
					$(this).remove();
				}
			});

		}


		// Deactivate hide header until needed effect on phone.
		if (nectarDOMInfo.usingMobileBrowser && $('#header-outer[data-remove-fixed="1"]').length == 0) {
			$body.attr('data-hhun', '0');
		}

	}



	/**
	* Calculates the "Header Mega Menu Width - Full screen width" theme option.
	*
	* @since 6.0
	*/
	function megamenuFullwidth() {

		var $windowWidth = $window.width();
		var $headerContainerWidth = $('header#top > .container').width();
		$('header#top nav > ul > li.megamenu > .sub-menu').css({
			'padding-left': ($windowWidth - $headerContainerWidth) / 2 + 'px',
			'padding-right': ($windowWidth + 2 - $headerContainerWidth) / 2 + 'px',
			'width': $headerContainerWidth,
			'left': '-' + ($windowWidth - $headerContainerWidth) / 2 + 'px'
		});
	}


	/**
	* Hide main navigation on mobile.
	*
	* @since 2.0
	*/
	function addOrRemoveSF() {

		if (nectarDOMInfo.winW < 1000 && $body.attr('data-responsive') == '1') {
			$body.addClass('mobile');
			$('header#top nav').css('display', 'none');
		} else {
			$body.removeClass('mobile');
			$('header#top nav').css('display', '');
			$('.slide-out-widget-area-toggle #toggle-nav .lines-button').removeClass('close');
		}


	}


	/**
	* Calculates whether submenu needs to display aligned opposite (from lack of space).
	*
	* @since 2.0
	*/
	function showOnLeftSubMenu() {

		// Show on left class for minimal styling.
		$('#header-outer .sf-menu > li:not(.megamenu) > ul > li > ul').each(function () {

			$(this).removeClass('on-left-side');

			if ($(this).offset().left + $(this).outerWidth() > $window.width()) {
				$(this).addClass('on-left-side');
				$(this).find('ul').addClass('on-left-side');
			} else {
				$(this).removeClass('on-left-side');
				$(this).find('ul').removeClass('on-left-side');
			}

		});
	}




	/**
	* Clients carousel height calculations.
	*
	* @since 2.0
	*/
	function clientsCarouselHeightRecalc() {

		var tallestImage = 0;

		$('.carousel.clients.finished-loading').each(function () {

			$(this).find('> div').each(function () {

				if ($(this).height() > tallestImage) {
					tallestImage = $(this).height();
				}

			});

			$(this).css('height', tallestImage);
			$(this).parent().css('height', tallestImage);
		});
	}

	$window.on("orientationchange", function () {
		setTimeout(clientsCarouselHeightRecalc, 200);
	});














	/*-------------------------------------------------------------------------*/
	/*	Helper Functions
	/*-------------------------------------------------------------------------*/


	/**
	* Cross browser request animation frame.
	*
	* @since 4.0
	*/
	window.requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (f) {
			setTimeout(f, 1000 / 60);
		}


	/**
	* Smart resize.
	*
	* @since 1.0
	*/
	var $event = $.event,
		dispatchMethod = $.event.handle ? 'handle' : 'dispatch',
		resizeTimeout;

	$event.special.smartresize = {
		setup: function () {
			$(this).on("resize", $event.special.smartresize.handler);
		},
		teardown: function () {
			$(this).off("resize", $event.special.smartresize.handler);
		},
		handler: function (event, execAsap) {

			var context = this,
				args = arguments;

			event.type = "smartresize";

			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}
			resizeTimeout = setTimeout(function () {
				$event[dispatchMethod].apply(context, args);
			}, execAsap === "execAsap" ? 0 : 100);
		}
	};

	$.fn.smartresize = function (fn) {
		return fn ? this.on("smartresize", fn) : this.trigger("smartresize", ["execAsap"]);
	};


	/**
	* Linear interpolation
	*
	* @since 11.0
	*/
	function linearInterpolate(a, b, n) {
		return (1 - n) * a + n * b;
	}

	/**
	* Aspect Ratio Calculator
	*
	* @since 11.0
	*/
	function calculateAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
		var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
		return { width: srcWidth * ratio, height: srcHeight * ratio };
	}

	/**
	* Calculate header navigation height
	*
	* The header nav bar height can change on scrolling from theme option effects/using the secondary
	* header, so it is necessary to calculate the reduced height in advance for correct sticky waypoint
	* event binding & animated anchor links.
	*
	* @since 10.5
	* @return {number} Height of nav bar.
	*/
	function calcHeaderNavHeight() {

		var navHeight;

		// Left header format, no header template, hide header until needed.
		if (($body.is('[data-header-format="left-header"]') && nectarDOMInfo.winW >= 1000) ||
			$body.is('[data-hhun="1"]') && nectarDOMInfo.winW >= 1000 ||
			$('.page-template-template-no-header-footer').length > 0 ||
			$('.page-template-template-no-header').length > 0) {

			navHeight = 0;

		}

		// Regular Header 
		else {

			var headerPadding2 = headerPadding - headerPadding / 1.8;
			var $headerNavSpace = $headerOuterEl.outerHeight();

			// Secondary header bar.
			if ($headerSecondaryEl.length > 0 && $body.is('.material') ||
				$headerSecondaryEl.length > 0 && !$body.is('.material') && nectarDOMInfo.winW < 1000) {
				$headerNavSpace -= nectarDOMInfo.secondaryHeaderHeight;
			}

			// Check for header resize effect.
			if ($headerOuterEl.is('[data-header-resize="1"]') && !$headerOuterEl.is('.small-nav') && nectarDOMInfo.winW >= 1000) {
				navHeight = $headerNavSpace - (parseInt(logoShrinkNum) + headerPadding2 * 2);
			} else {
				navHeight = $headerNavSpace;
			}

		}

		// Condense header effect.
		if (nectarDOMInfo.winW >= 1000 && $('#header-outer[data-condense="true"]').length > 0) {

			var $headerSpan9 = $('#header-outer[data-format="centered-menu-bottom-bar"] header#top .span_9');
			navHeight = $headerOuterEl.height() - (parseInt($headerSpan9.position().top) - parseInt($headerOuterEl.find('#logo').css('margin-top'))) - parseInt(nectarDOMInfo.secondaryHeaderHeight);

		}

		return navHeight;

	}


	/**
	* Removes CSS outlines in an accessible manner.
	*
	* @since 10.5
	*/
	(function (d) {

		var style_element = d.createElement('STYLE'),
			dom_events = 'addEventListener' in d,
			add_event_listener = function (type, callback) {
				if (dom_events) {
					d.addEventListener(type, callback);
				} else {
					d.attachEvent('on' + type, callback);
				}
			},
			set_css = function (css_text) {
				!!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;
			};

		d.getElementsByTagName('HEAD')[0].appendChild(style_element);

		add_event_listener('mousedown', function () {
			set_css(':focus{outline:0}::-moz-focus-inner{border:0;}');
		});

		add_event_listener('keydown', function () {
			set_css('');
		});

	})(document);



	/**
	* Cursor position.
	*
	* @since 4.0
	*/
	jQuery.fn.setCursorPosition = function (position) {

		if (this.length == 0) {
			return this;
		}
		return $(this).setSelection(position, position);
	};


	/**
	* Set selection in input.
	*
	* @since 4.0
	*/
	jQuery.fn.setSelection = function (selectionStart, selectionEnd) {
		if (this.length == 0) {
			return this;
		}
		var input = this[0];

		if (input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select();
		} else if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		}

		return this;
	};

	$.extend($.expr[':'], {
		transparent: function (elem, i, attr) {
			return ($(elem).css("opacity") === "0");
		}
	});



	/**
	* Converts to hex.
	*
	* @since 3.0
	*/
	function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}

	/**
	* CSS color RGB helper.
	*
	* @since 3.0
	*/
	$.cssHooks.color = {
		get: function (elem) {

			var color;

			if (elem.currentStyle) {
				color = elem.currentStyle["color"];
			} else if (window.getComputedStyle) {
				color = document.defaultView.getComputedStyle(elem,
					null).getPropertyValue("color");
			}
			if (color.search("rgb") == -1) {
				return color;
			} else {
				color = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

				if (color) {
					return "#" + hex(color[1]) + hex(color[2]) + hex(color[3]);
				}
			}
		}
	};

	/**
	* CSS background color RGB helper.
	*
	* @since 3.0
	*/
	$.cssHooks.backgroundColor = {
		get: function (elem) {

			var bg;

			if (elem.currentStyle) {
				bg = elem.currentStyle["backgroundColor"];
			} else if (window.getComputedStyle) {
				bg = document.defaultView.getComputedStyle(elem,
					null).getPropertyValue("background-color");
			}
			if (bg.search("rgb") == -1) {
				return bg;
			} else {
				bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

				if (bg) {
					return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
				}
			}
		}
	};


	/**
	* Unique ID generator.
	*
	* @since 10.5
	*/
	function uniqueIdGenerate() {
		return Math.floor(Math.random() * 10000);
	}



	/**
	* Mobile break point checker
	*
	* @since 9.0
	*/
	function mobileBreakPointCheck() {

		var $mobileBreakpoint = ($('div[data-header-breakpoint]').length > 0 && $body.attr('data-header-breakpoint') != '1000') ? parseInt($body.attr('data-header-breakpoint')) : 1000;
		var $withinCustomBreakpoint = false;

		if ($mobileBreakpoint != 1000) {
			if ($('div[data-user-set-ocm="1"][data-slide-out-widget-area-style="slide-out-from-right-hover"]').length == 0 && nectarDOMInfo.winW > 1000 && nectarDOMInfo.winW <= $mobileBreakpoint) {
				$withinCustomBreakpoint = true;
			}
		}

		return $withinCustomBreakpoint;
	}

	/**
	* Extract a URL
	*
	* @since 5.0
	*/
	function extractUrl(input) {
		return input.replace(/"/g, "").replace(/url\(|\)$/ig, "");
	}

	/**
	* Extract query params
	*
	* @since 10.5
	*/
	function getQueryParams(qs) {
		qs = qs.split("+").join(" ");
		var params = {},
			tokens,
			re = /[?&]?([^=]+)=([^&]*)/g;

		while (tokens = re.exec(qs)) {
			params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
		}

		return params;
	}

	var nectarGetQueryParam = getQueryParams(document.location.search);


	var easeOutCubic = function (t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	};



	/**
	* Color hex to rgb
	*
	* @since 3.0
	*/
	function shadeColor(hex, lum) {

		// Validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		lum = lum || 0;

		// Convert to decimal and change luminosity
		var rgb = "#",
			c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i * 2, 2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00" + c).substr(c.length);
		}

		return rgb;
	}





	/**
	* Team member element fullscreen overflow scrolling event.
	*
	* @since 7.0
	*/
	function fullscreenBioScrolling() {
		$('.nectar_team_member_overlay .inner-wrap').mousewheel(function (event, delta) {
			this.scrollTop -= (delta * 30);
			event.preventDefault();
		});

	}







	/**
	* Displace filter column/row BG effect
	*
	* @since 10.5
	*/
	function nectarLiquidBGs() {
		$liquidBG_EL = [];

		if (typeof NectarLiquid == 'undefined' || nectarDOMInfo.usingFrontEndEditor) {
			return;
		}

		$('.row-bg-wrap[data-bg-animation*="displace-filter"] .row-bg.using-image, .column-image-bg-wrap[data-bg-animation*="displace-filter"] .column-image-bg').each(function (i) {

			var $that_el = $(this);
			var $type;
			var $el_type;

			if ($(this).is('.row-bg')) {
				$type = $(this).parents('.row-bg-wrap').attr('data-bg-animation');
				$el_type = 'row';
			}
			else if ($(this).is('.column-image-bg')) {
				$type = $(this).parents('.column-image-bg-wrap').attr('data-bg-animation');
				$el_type = 'col';
			}

			$liquidBG_EL[i] = new NectarLiquid($that_el, $type, $el_type);

		});
	}
















	/**
	* Fancy unordered list element icons.
	*
	* @since 11.0
	*/
	function nectarFancyUlIcons() {

		$('.nectar-fancy-ul:not([data-list-icon="dot"])').each(function () {

			var $icon = $(this).attr('data-list-icon'),
				$color = $(this).attr('data-color');

			$(this).find('li').each(function () {
				$(this).find('> i').remove();
				$(this).prepend('<i class="icon-default-style ' + $icon + ' ' + $color + '"></i> ');
			});

		});

	}


	/**
	* Flipbox element height calculations.
	*
	* @since 7.0
	*/
	function flipBoxHeights() {

		$('.nectar-flip-box').each(function () {

			var $flipBoxMinHeight = parseInt($(this).attr('data-min-height')),
				$flipBoxHeight = $(this).find('.flip-box-front .inner').height();

			if ($(this).find('.flip-box-back .inner').height() > $(this).find('.flip-box-front .inner').height()) {
				$flipBoxHeight = $(this).find('.flip-box-back .inner').height();
			}

			if ($flipBoxHeight >= $flipBoxMinHeight - 80) {
				$(this).find('> div').css('height', $flipBoxHeight + 80);
			} else {
				$(this).find('> div').css('height', 'auto');
			}

			// Safari needs 3D translate.
			if ($(this).parent().hasClass('wpb_wrapper')) {
				$(this).parent().css('transform', 'translateZ(0)');
			}

		});
	}




	/**
	* Flipbox element events.
	*
	* @since 7.0
	*/
	function flipBoxInit() {

		if ($('.nectar-flip-box').length > 0) {

			// Mobile gets click.
			if (nectarDOMInfo.usingMobileBrowser) {
				$body.on('click', '.nectar-flip-box', function () {
					$(this).toggleClass('flipped');
				});
			}

			flipBoxHeights();

			// Handle resize.
			$window.on('smartresize', flipBoxHeights);
		}

	}




	/**
	* Parallax Scrolling
	*
	* @since 3.0
	*/
	$.fn.parallaxScroll = function (xpos, speedFactor, outerHeight) {

		var $windowDOMWidth = nectarDOMInfo.winW,
			$windowDOMHeight = nectarDOMInfo.winH,
			$orientationChange = 0,
			$this = $(this),
			firstTop = $this.offset().top;

		// Get the starting position of each element to have parallax applied to it		
		$this.each(function () {
			firstTop = $this.offset().top;
		});

		var getHeight = function (jqo) {
			return jqo.outerHeight(true);
		};

		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) {
			xpos = "50%";
		}
		if (arguments.length < 2 || speedFactor === null) {
			speedFactor = 0.25;
		}
		if (arguments.length < 3 || outerHeight === null) {
			outerHeight = true;
		}

		var $onMobileBrowser = nectarDOMInfo.usingMobileBrowser,
			classic_mobile_menu_open = false,
			firstSection = false,
			$element = $this,
			height = getHeight($element);


		$this.find('.row-bg.using-image, .page-header-bg-image, .image-bg, .video-wrap').addClass('translate');

		setInterval(function () {

			height = getHeight($element);
			classic_mobile_menu_open = ($('body.classic_mobile_menu_open.mobile').length > 0) ? true : false;

		}, 600);


		if ($element.parents('.top-level').length > 0 && $element.parents('.parallax_slider_outer').length > 0 ||
			$element.parents('.top-level').length > 0 && $element.is('.nectar-recent-posts-single_featured') ||
			$element.is('.wpb_row.top-level') ||
			$('.wpb_row').length == 0) {
			firstSection = true;
		}

		if ($('.wpb_row').length == 0 && $element.parents('.parallax_slider_outer').length > 0 && $element.is('[data-full-width="true"]') ||
			($('#portfolio-extra').length > 0 && $element.parents('.parallax_slider_outer').length > 0 && $element.parents('.wpb_row').length > 0 && $element.parents('.wpb_row').index() == '0')) {
			firstSection = true;
		}

		if (nectarDOMInfo.usingFrontEndEditor) {
			firstSection = false;
		}

		var nectarSliderElBool = $this.is('.nectar-slider-wrap');
		var pageHeaderBool = ($this.find('.page-header-bg-image').length > 0) ? true : false;
		var $elToParallax = false;

		if (nectarSliderElBool) {

			if ($this.find('.video-wrap').length > 0 || $this.find('.image-bg').length > 0) {
				$elToParallax = $this.find('.video-wrap, .image-bg');
			}

		} else {

			if ($this.find('.row-bg.using-image').length > 0) {
				$elToParallax = $this.find('.row-bg.using-image');
			} else if ($this.find('.page-header-bg-image').length > 0) {
				$elToParallax = $this.find('.page-header-bg-image');
			}

		}


		function update() {

			firstTop = $element.offset().top;

			// Check if totally above or totally below viewport.
			if ($elToParallax == false ||
				firstTop + height < nectarDOMInfo.scrollTop ||
				firstTop > nectarDOMInfo.scrollTop + nectarDOMInfo.winH ||
				$('body.material-ocm-open').length > 0) {
				// Skip processing.
			} else {

				// Nectar slider
				if (nectarSliderElBool) {

					if (firstSection) {
						// Top level row
						if (!classic_mobile_menu_open) {
							$this.find('.video-wrap, .image-bg').css({
								'transform': 'translate3d(0, ' + parseFloat(nectarDOMInfo.scrollTop * speedFactor) + 'px, 0)'
							});
						}
					} else {
						$this.find('.video-wrap, .image-bg').css({
							'transform': 'translate3d(0, ' + parseFloat((($windowDOMHeight + nectarDOMInfo.scrollTop - firstTop) * speedFactor)) + 'px, 0)'
						});
					}

				} else {

					// Rows
					if (firstSection) {
						// Top level row
						if (!classic_mobile_menu_open) {
							$elToParallax.css({
								'transform': 'translate3d(0, ' + parseFloat(nectarDOMInfo.scrollTop * speedFactor) + 'px, 0)'
							});
						}
					} else {
						// Regular rows further down page
						$elToParallax.css({
							'transform': 'translate3d(0, ' + parseFloat((($windowDOMHeight + nectarDOMInfo.scrollTop - firstTop) * speedFactor)) + 'px, 0), scale(1.005)'
						});
					}

					// Page header
					if (pageHeaderBool && !classic_mobile_menu_open) {
						$elToParallax.css({
							'transform': 'translate3d(0, ' + parseFloat(nectarDOMInfo.scrollTop * speedFactor) + 'px, 0)'
						});
					}

				}

			}


			//if on mobile, auto RAF
			if ($onMobileBrowser) {
				requestAnimationFrame(update);
			}

		}

		if (window.addEventListener) {

			if (nectarDOMInfo.usingFrontEndEditor || !nectarDOMInfo.usingMobileBrowser) {
				$window.on('resize', function () {
					$windowDOMWidth = nectarDOMInfo.winW;
					$windowDOMHeight = nectarDOMInfo.winH;
				});
			}

			if (nectarDOMInfo.usingFrontEndEditor) {

				$window.on('scroll.parallaxSections', update);

			} else if (!nectarDOMInfo.usingMobileBrowser) {

				window.addEventListener('scroll', function () {
					requestAnimationFrame(update);
				}, false);

			} else {

				//if on mobile, auto RAF
				requestAnimationFrame(update);

				window.addEventListener("orientationchange", function () {
					$orientationChange = 1;
				});

				$window.on('resize', function () {
					if (($window.width() != $windowDOMWidth && $window.height != $windowDOMHeight) || $orientationChange == 1) {

						//store the current window dimensions
						$windowDOMWidth = nectarDOMInfo.winW;
						$windowDOMHeight = nectarDOMInfo.winH;

						$orientationChange = 0;
					}
				});

			}

		}

		$window.on('resize.parallaxSections', update);

		update();

	};











	/**
	* Parallax scroll speed helper.
	*
	* @since 4.0
	*/
	function parallaxSrollSpeed(speedString) {

		var speed;
		switch (speedString) {
			case 'slow':
				speed = 0.6;
				break;
			case 'medium':
				speed = 0.4;
				break;
			case 'fast':
				speed = 0.25;
				break;
		}

		return speed;
	}








	/**
	* Full width row padding adjust calculations.
	*
	* @since 3.0
	*/
	function fullWidthRowPaddingAdjustCalc() {

		if ($('#boxed').length == 0) {

			$('.full-width-section[data-top-percent], .full-width-section[data-bottom-percent], .full-width-content[data-top-percent], .full-width-content[data-bottom-percent]').each(function () {

				var $windowHeight = $window.width(),
					$topPadding = ($(this).attr('data-top-percent')) ? $(this).attr('data-top-percent') : 'skip',
					$bottomPadding = ($(this).attr('data-bottom-percent')) ? $(this).attr('data-bottom-percent') : 'skip';

				//top
				if ($topPadding != 'skip') {
					$(this).css('padding-top', $windowHeight * (parseInt($topPadding) / 100));
				}

				//bottom
				if ($bottomPadding != 'skip') {
					$(this).css('padding-bottom', $windowHeight * (parseInt($bottomPadding) / 100));
				}

			});
		}
	}

	/**
	* Full width row padding adjust calculations for boxed theme option.
	*
	* @since 11.0.4
	*/
	function fullWidthRowPaddingAdjustCalcBoxed() {

		if ($('#boxed').length > 0) {

			$('.full-width-section[data-top-percent], .full-width-section[data-bottom-percent], .full-width-content[data-top-percent], .full-width-content[data-bottom-percent]').each(function () {

				var $topPadding = ($(this).attr('data-top-percent')) ? $(this).attr('data-top-percent') : 'skip',
					$bottomPadding = ($(this).attr('data-bottom-percent')) ? $(this).attr('data-bottom-percent') : 'skip';

				//top
				if ($topPadding != 'skip') {
					$(this).css('padding-top', $topPadding);
				}

				//bottom
				if ($bottomPadding != 'skip') {
					$(this).css('padding-bottom', $bottomPadding);
				}

			});
		}

	}


	/**
	* Full width row padding adjust initialization
	*
	* @since 10.5
	*/
	function fullWidthRowPaddingAdjust() {

		if (nectarDOMInfo.usingMobileBrowser) {
			fullWidthRowPaddingAdjustCalc();
		}

		$window.on('resize', fullWidthRowPaddingAdjustCalc);

	}


	/**
	* Mouse parallax row option.
	*
	* @since 4.0
	*/
	function mouseParallaxInit() {

		$('.wpb_row:has(.nectar-parallax-scene)').each(function (i) {

			var $strength = parseInt($(this).find('.nectar-parallax-scene').attr('data-scene-strength'));

			$mouseParallaxScenes[i] = $(this).find('.nectar-parallax-scene').parallax({
				scalarX: $strength,
				scalarY: $strength
			});

			// Wait until the images in the scene have loaded.
			var images = $(this).find('.nectar-parallax-scene li');

			$.each(images, function () {
				if ($(this).find('div').length > 0) {
					var el = $(this).find('div'),
						image = el.css('background-image').replace(/"/g, '').replace(/url\(|\)$/ig, '');
					if (image && image !== '' && image !== 'none') {
						images = images.add($('<img>').attr('src', image));
					}
				}
			});

		});

	}






	/**
	* Add checkmark icons to unorder list with checkmark class.
	*
	* @since 2.0
	*/
	function ulCheckmarks() {
		$('ul.checks li').each(function () {
			if ($(this).find('i.fa-check-circle').length == 0) {
				$(this).prepend('<i class="fa fa-check-circle"></i>');
			}
		});
	}




	/**
	* Allow CTA element BG color to also act as a link.
	*
	* @since 11.0
	*/
	function ctaLinkBG() {

		$body.on('click', '.nectar-cta[data-using-bg="true"]:not([data-style="material"]) .link_wrap', function () {

			$(this).find('a.link_text')[0].click();

		});

	}



	/**
	* Add CSS default animation classes through JS to 
	* avoid inital animation on page load.
	*
	* @since 11.0
	*/
	function nectarKeyframeAssist() {

		$('.nectar-cta[data-style="arrow-animation"]').addClass('loaded');

	}




	/**
	* Cascading images element sizing
	*
	* @since 6.0
	*/
	function cascadingImageBGSizing() {

		$('.nectar_cascading_images').each(function () {

			//handle max width for cascading images in equal height columns
			if ($(this).parents('.vc_row-o-equal-height').length > 0 && $(this).parents('.wpb_column').length > 0) {
				$(this).css('max-width', $(this).parents('.wpb_column').width());
			}

			//set size for layers with no images
			$(this).find('.bg-color').each(function () {

				var $bgColorHeight = 0;
				var $bgColorWidth = 0;

				if ($(this).parent().find('.img-wrap').length == 0) {

					var $firstSibling = $(this).parents('.cascading-image').siblings('.cascading-image[data-has-img="true"]').first();

					$firstSibling.css({
						'position': 'relative',
						'visiblity': 'hidden'
					});

					$bgColorHeight = $firstSibling.find('.img-wrap').height();
					$bgColorWidth = $firstSibling.find('.img-wrap').width();

					if ($firstSibling.index() == 0) {
						$firstSibling.css({
							'visiblity': 'visible'
						});
					} else {
						$firstSibling.css({
							'position': 'absolute',
							'visiblity': 'visible'
						});
					}
				} else {
					$bgColorHeight = $(this).parent().find('.img-wrap').height();
					$bgColorWidth = $(this).parent().find('.img-wrap').width();
				}

				$(this).css({
					'height': $bgColorHeight,
					'width': $bgColorWidth
				});
			});
		});

	}




	/**
	* Cascading images element initialization.
	*
	* @since 10.5
	*/
	function cascadingImageInit() {

		if ($('.nectar_cascading_images').length > 0) {

			var cascadingParallax = [];

			$('.nectar_cascading_images').each(function (i) {

				imagesLoaded($(this), function (instance) {

					// Create sizes.
					cascadingImageBGSizing();

					// Parallax scrolling.
					if ($(instance.elements[0]).is('[data-parallax="yes"]') && !nectarDOMInfo.usingMobileBrowser && $('#nectar_fullscreen_rows').length == 0) {
						cascadingParallax[i] = new CascadingParallax($(instance.elements[0]), $(instance.elements[0]).attr('data-parallax-intensity'));
					}

				});

			});

			// BG Sizing Resize.
			$window.on('resize', cascadingImageBGSizing);

		}

	}




	function CascadingParallax(el, intensity) {

		this.$element = el;
		this.inView = false;
		this.topLevel = false;
		this.lastY = 0;

		this.layer1Parallax = (this.$element.is('[data-layer-1-parallax="yes"]')) ? true : false;

		switch (intensity) {
			case 'subtle':
				this.intensity = 0.09;
				break;
			case 'medium':
				this.intensity = 0.15;
				break;
			case 'high':
				this.intensity = 0.25;
				break;
		}
		this.calculatePos();
		this.trackView();
		this.animate();

		if ($('.portfolio-filters').length > 0 ||
			$('.portfolio-filters-inline').length > 0) {
			setInterval(this.calculatePos.bind(this), 700);
		}

		$window.on('resize', this.calculatePos.bind(this));
	}

	CascadingParallax.prototype.calculatePos = function () {
		this.offsetTop = this.$element.offset().top;
		this.height = this.$element.outerHeight();
		this.vertCenter = nectarDOMInfo.winH / 2 - this.height / 2;
	};

	CascadingParallax.prototype.trackView = function () {

		var that = this;

		if (this.$element.parents('.top-level').length > 0) {
			this.topLevel = true;
		}

		if ('IntersectionObserver' in window) {

			var options = {
				rootMargin: '250px',
			}
			var observer = new IntersectionObserver(function (entries) {

				entries.forEach(function (entry) {
					var isIntersecting = entry.isIntersecting;

					if (isIntersecting) {
						that.inView = true;
					} else {
						that.inView = false;
					}
				});

			}, options);

			observer.observe(this.$element[0]);

		}

	};

	CascadingParallax.prototype.animate = function () {

		if (this.inView) {

			var that = this;

			this.lastY = linearInterpolate(this.lastY, nectarDOMInfo.scrollTop, 0.18);

			this.$element.find('.bg-layer').each(function (i) {

				var $scale = $(this).attr('data-scale');

				if (that.layer1Parallax) {
					i = (i / 1.5) + 1;
				}

				if (that.topLevel === true && nectarDOMInfo.winW > 1000) {
					$(this).css('transform', 'translateY(' + -(that.lastY * that.intensity * i) + 'px) translateZ(0) scale(' + $scale + ')');
				} else {
					$(this).css('transform', 'translateY(' + -((that.lastY - that.offsetTop + that.vertCenter) * that.intensity * i) + 'px) translateZ(0) scale(' + $scale + ')');
				}

			});
		}

		window.requestAnimationFrame(this.animate.bind(this));
	};










	/**
	* Image with hotspots element hover event
	*
	* @since 7.0
	*/
	function hotSpotHoverBind() {

		//add pulse animation
		$('.nectar_image_with_hotspots[data-hotspot-icon="numerical"]').each(function () {
			$(this).find('.nectar_hotspot_wrap').each(function (i) {
				var $that = $(this);
				setTimeout(function () {
					$that.find('.nectar_hotspot').addClass('pulse');
				}, i * 300);
			});
		});


		var hotSpotHoverTimeout = [];

		$('.nectar_image_with_hotspots:not([data-tooltip-func="click"]) .nectar_hotspot').each(function (i) {

			hotSpotHoverTimeout[i] = '';

			$(this).on('mouseover', function () {
				clearTimeout(hotSpotHoverTimeout[i]);
				$(this).parent().css({
					'z-index': '400',
					'height': 'auto',
					'width': 'auto'
				});
			});

			$(this).on('mouseleave', function () {

				var $that = $(this);
				$that.parent().css({
					'z-index': 'auto'
				});

				hotSpotHoverTimeout[i] = setTimeout(function () {
					$that.parent().css({
						'height': '30px',
						'width': '30px'
					});
				}, 300);

			});

		});

	}



	/**
	* Correct megamenus in mobile navigation.
	*
	* @since 8.0
	*/
	function mobileNavMegamenuCorrect() {

		////mobile megamenus without titles / nested groupings
		var $mobileNavSelector = ($('#top #mobile-menu').length > 0) ? '#top #mobile-menu ' : '.off-canvas-menu-container.mobile-only ';

		$($mobileNavSelector + '.megamenu > ul > li > a').each(function () {
			if ($(this).text() == '-' || $(this).text() == '–' || $(this).parent().hasClass('hide-title')) {
				var $navLIs = $(this).parent().find('> ul > li').clone();
				$(this).parent().find('ul').remove();
				$(this).parent().parent().append($navLIs);
				$(this).parent().remove();
			}
		});

	}








	/**
	* Material theme skin off canvas menu initialization.
	*
	* @since 10.5
	*/
	function materialSkinOCM_Init() {

		if ($('body.material[data-slide-out-widget-area-style="slide-out-from-right"]').length > 0) {
			OCM_materialWidth();

			if ($wpAdminBar.length > 0) {
				var $topToolBar = $wpAdminBar.detach();
				$('.ocm-effect-wrap-inner').append($topToolBar);
			}

		}

		OCM_materialIconMarkup();
		materialSkinTransition();

		$window.on('resize', OCM_materialSize);

	}




	/**
	* Material theme skin transition helper
	*
	* @since 10.5
	*/
	function materialSkinTransition() {

		if ($('body.material[data-header-search="true"]').length > 0 ||
			$('body.material .ocm-effect-wrap').length > 0) {

			var materialTransTO,
				allowMaterialResizeCalc = false,
				orientTrack = 0,
				$winDOMWidth = nectarDOMInfo.winW,
				$winDOMHeight = nectarDOMInfo.winH;

			// For mobile make sure the orientation has changed.
			window.addEventListener("orientationchange", function () {
				orientTrack = 1;
			});



		}

	}



	/**
	* Calculate off canvas menu slide out from right on hover
	*
	* @since 8.0
	*/
	function calculateHoverNavMinHeight() {

		var $widgetHeights = 0;
		$('#slide-out-widget-area > .widget').each(function () {
			$widgetHeights += $(this).height();
		});

		var $menuHeight;

		if (($offCanvasEl.height() - 25 - $('.bottom-meta-wrap').outerHeight(true) - $widgetHeights) > $('#slide-out-widget-area .off-canvas-menu-container:last-child').height()) {
			$menuHeight = $offCanvasEl.height() - 25 - $('.bottom-meta-wrap').outerHeight(true) - $widgetHeights;
		} else {
			$menuHeight = $('#slide-out-widget-area .off-canvas-menu-container:last-child').height();
		}

		$('#slide-out-widget-area .inner').css({
			'height': 'auto',
			'min-height': $menuHeight
		});

		$('#slide-out-widget-area > .inner .off-canvas-menu-container').transition({
			y: '-' + ($('#slide-out-widget-area > .inner .off-canvas-menu-container:last-child').height() / 2) + 'px'
		}, 0);

	}


	/**
	* Material theme skin off canvas menu width.
	*
	* @since 8.0
	*/
	function OCM_materialWidth() {

		$('#slide-out-widget-area.slide-out-from-right').css({
			'padding-top': $window.height() * 0.1,
			'padding-bottom': $window.height() * 0.1
		});

		OCM_overflowState();
	}



	/**
	* Material theme skin off canvas menu icon markup
	*
	* @since 8.0
	*/
	function OCM_materialIconMarkup() {

		if ($('body.material').length > 0 && $('div[data-slide-out-widget-area-style="slide-out-from-right-hover"]').length == 0) {

			if ($('div[data-slide-out-widget-area-style*="fullscreen"]').length == 0 && $('#mobile-menu').length == 0) {
				var $menuIconClone = $('header#top nav ul .slide-out-widget-area-toggle a > span > i').clone();
				$menuIconClone.addClass('hover-effect');
				$('header#top nav ul .slide-out-widget-area-toggle a > span').append($menuIconClone);

				var $menuIconClone2 = $('header#top .slide-out-widget-area-toggle.mobile-icon a > span > i').clone();
				$menuIconClone2.addClass('hover-effect');
				$('header#top .slide-out-widget-area-toggle.mobile-icon a > span').append($menuIconClone2);
			}

			$('body:not([data-slide-out-widget-area-style="slide-out-from-right"]) header#top .slide-out-widget-area-toggle a > span')
				.append($('<span class="close-wrap"> <span class="close-line close-line1"></span> <span class="close-line close-line2"></span> </span>'));

			setTimeout(function () {
				$('header#top .slide-out-widget-area-toggle a > span .close-wrap').addClass('loaded');
			}, 200);

		}

		if ($('body.material #boxed').length > 0 && $('div[data-slide-out-widget-area-style="slide-out-from-right-hover"]').length > 0) {
			$('#ajax-content-wrap > .slide-out-widget-area-toggle.slide-out-hover-icon-effect').insertAfter('.ocm-effect-wrap');
		}

		//move material skin default ocm
		if ($('body.material').length > 0 && $('div[data-slide-out-widget-area-style*="fullscreen"]').length == 0) {
			$('body.material #slide-out-widget-area.slide-out-from-right .slide_out_area_close').insertAfter('.ocm-effect-wrap');
			$('#slide-out-widget-area-bg').insertAfter('.ocm-effect-wrap');
			$offCanvasEl.insertAfter('.ocm-effect-wrap');
		}

	}



	/**
	* Material theme skin off canvas menu height
	*
	* @since 8.0
	*/
	function OCM_materialSize() {
		if ($('.ocm-effect-wrap.material-ocm-open').length > 0) {

			$('.ocm-effect-wrap').css({
				'height': $window.height()
			});

			$('.ocm-effect-wrap-inner').css({
				'padding-top': nectarDOMInfo.adminBarHeight
			});

		}
	}



	/**
	* Off canvas menu dropdown markup
	*
	* @since 8.0
	*/
	function OCM_dropdownMarkup() {
		var $nectar_ocm_dropdown_func = ($('#slide-out-widget-area[data-dropdown-func]').length > 0) ? $offCanvasEl.attr('data-dropdown-func') : 'default';
		if ($nectar_ocm_dropdown_func == 'separate-dropdown-parent-link') {
			$('#slide-out-widget-area .off-canvas-menu-container li.menu-item-has-children').append('<span class="ocm-dropdown-arrow"><i class="fa fa-angle-down"></i></span>');
		}
	}



	/**
	* Off canvas menu dropdown icon position.
	*
	* @since 8.0
	*/
	function OCM_dropdownIconPos() {

		$('#slide-out-widget-area[class*="slide-out-from-right"] .off-canvas-menu-container li.menu-item-has-children').each(function () {
			$(this).find('.ocm-dropdown-arrow').css({
				'top': $(this).find('a').height() / 2
			});
		});
		$('#slide-out-widget-area.fullscreen-split .off-canvas-menu-container li.menu-item-has-children').each(function () {
			$(this).find('.ocm-dropdown-arrow').css({
				'top': $(this).find('a').height() / 2
			});
		});

	}




	/**
	* Off canvas menu overflow scrolling.
	*
	* @since 8.0
	*/
	function OCM_overflowState() {

		//switch position of social media/extra info based on screen size
		if (nectarDOMInfo.winW < 1000 ||
			$('body > #boxed').length > 0 ||
			$('.ocm-effect-wrap-inner > #boxed').length > 0) {

			$('#slide-out-widget-area.fullscreen .off-canvas-social-links, #slide-out-widget-area.fullscreen-alt .off-canvas-social-links').appendTo('#slide-out-widget-area .inner');
			$('#slide-out-widget-area.fullscreen .bottom-text, #slide-out-widget-area.fullscreen-alt .bottom-text').appendTo('#slide-out-widget-area .inner');

		} else {
			$('#slide-out-widget-area.fullscreen .off-canvas-social-links,#slide-out-widget-area.fullscreen-alt .off-canvas-social-links').appendTo('#slide-out-widget-area .inner-wrap');
			$('#slide-out-widget-area.fullscreen .bottom-text, #slide-out-widget-area.fullscreen-alt .bottom-text').appendTo('#slide-out-widget-area .inner-wrap');
		}

		//add overflow
		if (!$offCanvasEl.hasClass('fullscreen-split')) {

			if ($('#slide-out-widget-area[class*="fullscreen"] .inner').height() >= $window.height() - 100) {
				$('#slide-out-widget-area[class*="fullscreen"] .inner, #slide-out-widget-area[class*="fullscreen"]').addClass('overflow-state');
			} else {
				$('#slide-out-widget-area[class*="fullscreen"] .inner, #slide-out-widget-area[class*="fullscreen"]').removeClass('overflow-state');
			}

			$('#slide-out-widget-area[class*="fullscreen"] .inner').transition({
				y: '-' + ($('#slide-out-widget-area[class*="fullscreen"] .inner').height() / 2) + 'px'
			}, 0);

		}

		//close mobile only slide out widget area if switching back to desktop
		if ($('.slide-out-from-right.open .off-canvas-menu-container.mobile-only').length > 0 && $('body.mobile').length == 0) {
			$('#slide-out-widget-area .slide_out_area_close').trigger('click');
		}

		//sizing for dropdown
		OCM_dropdownIconPos();

	}












	/**
	* Off canvas menu: slide out from right open.
	*
	* @since 10.5
	*/
	function OCM_slideOutRightOpen() {

		var $slideOutAmount = ($bodyBorderTop.length > 0 && $('body.mobile').length == 0) ? $bodyBorderTop.height() : 0;

		if ($('body.material').length == 0) {

			// Calc height if used bottom meta.
			$('#slide-out-widget-area .inner').css({
				'height': 'auto',
				'min-height': $offCanvasEl.height() - 25 - $('.bottom-meta-wrap').height()
			});

			// First item dropdown?
			if ($('#slide-out-widget-area[data-dropdown-func="separate-dropdown-parent-link"] .inner > div:first-of-type > .menu > li:first-child').length > 0 &&
				$('#slide-out-widget-area .inner > div:first-of-type > .menu > li:first-child').hasClass('menu-item-has-children')) {
				$('#slide-out-widget-area .inner > div:first-of-type').css({ 'margin-top': '50px' });
			}

			if ($('#boxed').length == 0) {

				$('.container-wrap, .home-wrap, #footer-outer:not(#nectar_fullscreen_rows #footer-outer), .nectar-box-roll, #page-header-wrap .page-header-bg-image, #page-header-wrap .nectar-video-wrap, #page-header-wrap .mobile-video-image, #page-header-wrap #page-header-bg > .container, .page-header-no-bg, div:not(.container) > .project-title').stop(true).transition({
					x: '-300px'
				}, 700, 'easeInOutCubic');

				var $withinCustomBreakpoint = mobileBreakPointCheck();

				if ($('#header-outer[data-format="centered-logo-between-menu"]').length == 0 || $withinCustomBreakpoint) {

					if ($('#header-outer[data-transparency-option="1"]').length == 0 ||
						($('#header-outer[data-transparency-option="1"]').length > 0 && $('#header-outer[data-full-width="true"]').length == 0) ||
						$('body.mobile').length > 0) {

						$headerOuterEl.stop(true).css('transform', 'translateY(0)').transition({
							x: '-' + (300 + $slideOutAmount) + 'px'
						}, 700, 'easeInOutCubic');

					} else {

						$headerOuterEl.stop(true).css('transform', 'translateY(0)').transition({
							x: '-' + (300 + $slideOutAmount) + 'px',
							'background-color': 'transparent',
							'border-bottom': '1px solid rgba(255,255,255,0.22)'
						}, 700, 'easeInOutCubic');

					}
				} else {
					$('#header-outer header#top nav > ul.buttons, body:not(.material) #header-outer:not([data-format="centered-logo-between-menu"]) .cart-outer .cart-menu-wrap').transition({
						x: '-300px'
					}, 700, 'easeInOutCubic');
				}

			}

			$offCanvasEl.stop(true).transition({
				x: '-' + $slideOutAmount + 'px'
			}, 700, 'easeInOutCubic').addClass('open');


			if ($('#boxed').length == 0) {

				// Full width menu adjustments
				if ($('#header-outer[data-full-width="true"]').length > 0 && !$body.hasClass('mobile')) {
					$headerOuterEl.addClass('highzI');
					$('#ascrail2000').addClass('z-index-adj');

					if ($('#header-outer[data-format="centered-logo-between-menu"]').length == 0) {

						if ($bodyBorderWidth == 0) {
							$('header#top #logo').stop(true).transition({
								x: (300 + $slideOutAmount) + 'px'
							}, 700, 'easeInOutCubic');
						}

					}

					$('header#top .slide-out-widget-area-toggle .lines-button').addClass('close');

					$('body #header-outer nav > ul > li > a').css({
						'margin-bottom': '0'
					});

				}

			}

			$headerOuterEl.addClass('style-slide-out-from-right');

			// Fade In BG Overlay
			$offCanvasBG.css({
				'height': '100%',
				'width': '100%'
			}).stop(true).transition({
				'opacity': 1
			}, 700, 'easeInOutCubic', function () {
				$('.slide-out-widget-area-toggle:not(.std-menu) > div > a').removeClass('animating');
			});

			// Hide menu if no space
			if ($('#header-outer[data-format="centered-logo-between-menu"]').length == 0) {

				var $logoWidth = ($('#logo img:visible').length > 0) ? $('#logo img:visible').width() : $('#logo').width();

				if ($('header#top nav > .sf-menu').offset().left - $logoWidth - 300 < 20) {
					$headerOuterEl.addClass('hidden-menu');
				}

			} else {
				$headerOuterEl.addClass('hidden-menu-items');
			}


			if ($('#header-outer[data-remove-fixed="1"]').length == 0 && nectarDOMInfo.winW > 1000) {

				if ($bodyBorderHeaderColorMatch == true && headerResize == true) {

					$headerOuterEl.stop(true).transition({
						y: '0'
					}, 0).addClass('transparent').css('transition', 'transform');
					if ($headerOuterEl.attr('data-transparent-header') != 'true') {
						$headerOuterEl.attr('data-transparent-header', 'true').addClass('pseudo-data-transparent');
					}

					$window.off('scroll', bigNav);
					$window.off('scroll', smallNav);

				} else if ($bodyBorderHeaderColorMatch == true) {

					$headerOuterEl.addClass('transparent');
					$window.off('scroll', opaqueCheck);
					$window.off('scroll', transparentCheck);

					if ($headerOuterEl.attr('data-transparent-header') != 'true') {
						$headerOuterEl.attr('data-transparent-header', 'true').addClass('pseudo-data-transparent');
					}
				}
			}

		} else if ($('body.material').length > 0) {

			// Material theme skin slide out from right

			//move ajax loading outside
			if ($loadingScreenEl.length > 0 && $('.ocm-effect-wrap #ajax-loading-screen').length > 0) {
				$loadingScreenEl.insertBefore('.ocm-effect-wrap');
			}

			// Hide secondary header when not at top with hhun
			if (nectarDOMInfo.scrollTop > 40) {

				$('div[data-hhun="1"] #header-secondary-outer').addClass('hidden');
			}


			setTimeout(function () {
				$('.slide-out-widget-area-toggle:not(.std-menu) > div > a').removeClass('animating');
			}, 300);
			$('#slide-out-widget-area, #slide-out-widget-area-bg, #header-outer .slide-out-widget-area-toggle').addClass('material-open');


			// Handle bottom bar nav
			if ($('body:not(.mobile) #header-outer[data-format="centered-menu-bottom-bar"][data-condense="true"]').length > 0 &&
				$('#header-outer[data-format="centered-menu-bottom-bar"] .span_9').css('display') != 'none') {

				$('#header-outer:not(.fixed-menu)').css('top', nectarDOMInfo.adminBarHeight - nectarDOMInfo.scrollTop + 'px');

				if ($headerSecondaryEl.length > 0 && $('#header-outer.fixed-menu').length > 0) {
					$headerSecondaryEl.css('visibility', 'hidden');
				}

			}

			$('#ajax-content-wrap').css({
				'position': 'relative',
				'top': '-' + nectarDOMInfo.scrollTop + 'px'
			});

			$('.ocm-effect-wrap-inner').css({
				'padding-top': nectarDOMInfo.adminBarHeight
			});

			$('#fp-nav').addClass('material-ocm-open');

			$body.addClass('material-ocm-open');
			$body.addClass('nectar-no-flex-height');

			$('.ocm-effect-wrap').css({
				'height': nectarDOMInfo.winH
			});

			setTimeout(function () {
				$('.ocm-effect-wrap').addClass('material-ocm-open');
			}, 40);


			$('body > .slide_out_area_close').addClass('follow-body');

			//icon effect
			$('#header-outer:not([data-format="left-header"]) header#top .slide-out-widget-area-toggle a').addClass('effect-shown');

			//handle hhun when at top
			$('div[data-hhun="1"]:not(.no-scroll):not(.mobile) #header-outer[data-permanent-transparent="false"]:not(.detached):not(.parallax-contained):not(.at-top-before-box)').css({
				'transition': 'none',
				'transform': 'translateY(' + nectarDOMInfo.adminBarHeight + 'px)'
			});

			setTimeout(function () {
				$('body > .slide_out_area_close').addClass('material-ocm-open');
			}, 350);


		}

	}


	/**
	* Off canvas menu: slide out from right close.
	*
	* @since 10.5
	*/
	function OCM_slideOutRightClose() {

		if ($('body.material').length == 0) {

			$('.container-wrap, .home-wrap, #footer-outer:not(#nectar_fullscreen_rows #footer-outer), .nectar-box-roll, #page-header-wrap .page-header-bg-image,  #page-header-wrap .nectar-video-wrap, #page-header-wrap .mobile-video-image, #page-header-wrap #page-header-bg > .container, .page-header-no-bg, div:not(.container) > .project-title').stop(true).transition({
				x: '0px'
			}, 700, 'easeInOutCubic');

			if ($('#header-outer[data-transparency-option="1"]').length > 0 && $('#boxed').length == 0) {
				var $currentRowBG = ($('#header-outer[data-current-row-bg-color]').length > 0) ? $headerOuterEl.attr('data-current-row-bg-color') : $headerOuterEl.attr('data-user-set-bg');
				$headerOuterEl.stop(true).transition({
					x: '0px',
					'background-color': $currentRowBG
				}, 700, 'easeInOutCubic');
			} else {
				$headerOuterEl.stop(true).transition({
					x: '0px'
				}, 700, 'easeInOutCubic');
			}

			$offCanvasEl.stop(true).transition({
				x: '301px'
			}, 700, 'easeInOutCubic').removeClass('open');


			if ($('#boxed').length == 0) {
				if ($('#header-outer[data-full-width="true"]').length > 0) {
					$headerOuterEl.removeClass('highzI');
					$('header#top #logo').stop(true).transition({
						x: '0px'
					}, 700, 'easeInOutCubic');
					$('.lines-button').removeClass('close');

				}
			}

			if ($('#header-outer[data-format="centered-logo-between-menu"]').length > 0) {
				$('#header-outer header#top nav > ul.buttons, #header-outer .cart-outer .cart-menu-wrap').stop(true).transition({
					x: '0px'
				}, 700, 'easeInOutCubic');
			}

			//fade out overlay
			$offCanvasBG.stop(true).transition({
				'opacity': 0
			}, 700, 'easeInOutCubic', function () {

				$('.slide-out-widget-area-toggle a').removeClass('animating');

				$(this).css({
					'height': '1px',
					'width': '1px'
				});

				if ($('#header-outer[data-remove-fixed="1"]').length == 0) {

					//hide menu if transparent, user has scrolled down and hhun is on
					if ($headerOuterEl.hasClass('parallax-contained') &&
						nectarDOMInfo.scrollTop > 0 &&
						$('#header-outer[data-permanent-transparent="1"]').length == 0) {
						$headerOuterEl.removeClass('parallax-contained').addClass('detached').removeClass('transparent');
					}
					else if (nectarDOMInfo.scrollTop == 0 && $('div[data-hhun="1"]').length > 0 && $('#page-header-bg[data-parallax="1"]').length > 0 ||
						nectarDOMInfo.scrollTop == 0 && $('div[data-hhun="1"]').length > 0 && $('.parallax_slider_outer').length > 0) {

						if ($('#header-outer[data-transparency-option="1"]').length > 0) {
							$headerOuterEl.addClass('transparent');
						}

						$headerOuterEl
							.addClass('parallax-contained')
							.removeClass('detached');

					}

				}

				//fix for fixed subpage menu
				$('.container-wrap').css('transform', 'none');

			});


			$headerOuterEl.removeClass('style-slide-out-from-right');


			if ($('#header-outer[data-remove-fixed="1"]').length == 0) {

				if ($bodyBorderHeaderColorMatch == true &&
					headerResize == true &&
					nectarDOMInfo.winW > 1000) {

					$window.off('scroll.headerResizeEffect');
					if (nectarDOMInfo.scrollTop == 0) {

						$window.on('scroll.headerResizeEffect', smallNav);

						if ($('#header-outer[data-full-width="true"][data-transparent-header="true"]').length > 0 &&
							$bodyBorderTop.length > 0 &&
							$bodyBorderHeaderColorMatch == true &&
							$('#header-outer.pseudo-data-transparent').length > 0) {

							$('#header-outer[data-full-width="true"] header > .container').stop(true, true).animate({
								'padding': '0'
							}, {
								queue: false,
								duration: 250,
								easing: 'easeOutCubic'
							});

						}
					} else {
						$window.on('scroll.headerResizeEffect', bigNav);
					}

					if ($headerOuterEl.hasClass('pseudo-data-transparent')) {

						$headerOuterEl.attr('data-transparent-header', 'false')
							.removeClass('pseudo-data-transparent')
							.removeClass('transparent');
					}

					$headerOuterEl.css('transition', 'transform');

				} else if ($bodyBorderHeaderColorMatch == true && nectarDOMInfo.winW > 1000) {

					$window.off('scroll.headerResizeEffectOpaque');
					$window.on('scroll.headerResizeEffectOpaque', opaqueCheck);

					$headerOuterEl.css('transition', 'transform');

					if ($headerOuterEl.hasClass('pseudo-data-transparent')) {
						$headerOuterEl.attr('data-transparent-header', 'false')
							.removeClass('pseudo-data-transparent')
							.removeClass('transparent');
					}
				}
			}
		}

		else if ($('body.material').length > 0) {

			//material
			$offCanvasEl.removeClass('open');

			$('#slide-out-widget-area, #slide-out-widget-area-bg, #header-outer .slide-out-widget-area-toggle').removeClass('material-open');
			$('.ocm-effect-wrap, .ocm-effect-wrap-shadow, body > .slide_out_area_close, #fp-nav').removeClass('material-ocm-open');

			$('body > .slide_out_area_close').removeClass('follow-body');

			setTimeout(function () {
				$('.slide-out-widget-area-toggle a').removeClass('animating');

				$body.removeClass('material-ocm-open');
				$body.removeClass('nectar-no-flex-height');

				$('.ocm-effect-wrap').css({
					'height': '100%'
				});

				$('.ocm-effect-wrap-inner').css({
					'padding-top': '0'
				});

				$window.scrollTop(Math.abs(parseInt($('#ajax-content-wrap').css('top'))));

				$('#ajax-content-wrap').css({
					'position': '',
					'top': ''
				});


				//handle bottom bar nav
				if ($('#header-outer[data-format="centered-menu-bottom-bar"]').length > 0 &&
					$('#header-outer[data-format="centered-menu-bottom-bar"] .span_9').css('display') != 'none' &&
					$('body.mobile').length == 0) {

					$('#header-outer:not(.fixed-menu)').css('top', '');
					$headerSecondaryEl.css('visibility', '');

				}

				//handle hhun when at top
				$('div[data-hhun="1"]:not(.no-scroll) #header-outer[data-permanent-transparent="false"]:not(.detached):not(.parallax-contained):not(.at-top-before-box)').css({
					'transform': ''
				});
				setTimeout(function () {
					$('div[data-hhun="1"]:not(.no-scroll) #header-outer[data-permanent-transparent="false"]:not(.detached):not(.parallax-contained):not(.at-top-before-box)').css({
						'transition': ''
					});
				}, 30);


				$('div[data-hhun="1"] #header-secondary-outer.hidden').removeClass('hidden');

			}, 900);

			setTimeout(function () {

				//icon effect
				$('#header-outer:not([data-format="left-header"]) header#top .slide-out-widget-area-toggle a')
					.addClass('no-trans')
					.removeClass('effect-shown');

			}, 200);

			setTimeout(function () {
				//icon
				$('#header-outer:not([data-format="left-header"]) header#top .slide-out-widget-area-toggle a').removeClass('no-trans');
			}, 500);

		}

	}



	/**
	* Off canvas menu: simple dropdown click events.
	*
	* @since 10.5
	*/
	function OCM_simpleStyleInit() {

		if ($('#header-outer #mobile-menu').length == 0) {
			return;
		}

		$('#header-outer #mobile-menu li.megamenu').removeClass('megamenu');

		// Add icons/markup.
		$('#header-outer #mobile-menu ul li').each(function () {
			$(this).find('a').wrapInner('<span></span>');
			if ($(this).find('> ul').length > 0) {
				$(this).find('> a').append('<span class="sf-sub-indicator"><i class="fa fa-angle-down"></i></span>');
			}
		});

		// Click event.
		$('#header-outer #mobile-menu .sf-sub-indicator').on('click', function () {

			var $parentLI = $(this).parent().parent();

			$parentLI.toggleClass('current-open-item');

			// Open.
			if ($parentLI.hasClass('current-open-item')) {
				$parentLI.find('> ul').show();
				setTimeout(function () {
					$parentLI.addClass('visible');
				}, 30);
			} else {
				// Close.
				$parentLI.find('ul').hide();
				// Ensure open children also close.
				$parentLI.find('li').removeClass('visible').removeClass('current-open-item');
				$parentLI.removeClass('visible');
			}

			return false;

		});

		// Resize event.
		$window.on('smartresize', function () {

			if (nectarDOMInfo.winW > 1000 && $('.slide-out-widget-area-toggle.mobile-icon a.open').length > 0) {

				$('.slide-out-widget-area-toggle.mobile-icon a')
					.addClass('non-human-allowed')
					.trigger('click');

				setTimeout(function () {
					$('.slide-out-widget-area-toggle.mobile-icon a').removeClass('non-human-allowed');
				}, 100);

			}

		});

	}


	/**
	* Off canvas menu click triggered styles initialization
	*
	* @since 10.5
	*/
	function OCM_clickTriggeredStylesInit() {

		// Click triggered open bind.
		$body.on('click', '.slide-out-widget-area-toggle:not(.std-menu) a.closed:not(.animating), .nectar-ocm-trigger-open', function () {

			if (nectarBoxRoll.animating == 'true' || $('.slide-out-from-right-hover').length > 0) {
				return false;
			}

			$headerOuterEl.removeClass('no-transition');

			// Slide out from right.
			if ($offCanvasEl.hasClass('slide-out-from-right')) {
				OCM_slideOutRightOpen();
			}
			// Fullscreen.
			else if ($offCanvasEl.hasClass('fullscreen')) {
				OCM_fullscreenOpen();
			}
			// Fullscreen Alt.
			else if ($offCanvasEl.hasClass('fullscreen-alt') || $offCanvasEl.hasClass('fullscreen-split')) {
				OCM_fullscreenAltOpen();
			}
			// Simple dropdown.
			else if ($('#header-outer #mobile-menu').length > 0) {
				OCM_simpleDropdownOpen();
			}


			// Add open class
			if ($('#header-outer #mobile-menu').length == 0) {

				$headerOuterEl
					.removeClass('side-widget-closed')
					.addClass('side-widget-open');


				// Give header transparent state
				if ($('#header-outer[data-transparency-option="1"]').length > 0 &&
					$('#boxed').length == 0 &&
					$('#header-outer[data-full-width="true"]').length > 0 &&
					!nectarDOMInfo.usingFrontEndEditor) {

					if ($('body.material[data-slide-out-widget-area-style="slide-out-from-right"]').length == 0 &&
						$('body.material #header-outer[data-condense="true"]').length == 0) {

						$headerOuterEl.addClass('transparent');

					}

				}

				// Dark slide transparent nav
				if ($('#header-outer.dark-slide.transparent').length > 0 &&
					$('#boxed').length == 0 &&
					$('body.material-ocm-open').length == 0) {
					$headerOuterEl
						.removeClass('dark-slide')
						.addClass('temp-removed-dark-slide');
				}

			} // Not using simple OCM.


			$('.slide-out-widget-area-toggle > div > a')
				.removeClass('closed')
				.addClass('open')
				.attr('aria-expanded', 'true');

			$('.slide-out-widget-area-toggle > div > a').addClass('animating');

			return false;

		});



		// Close event bind.
		$body.on('click', '.slide-out-widget-area-toggle:not(.std-menu) a.open:not(.animating), #slide-out-widget-area .slide_out_area_close, > .slide_out_area_close, #slide-out-widget-area-bg.slide-out-from-right, .material-ocm-open #ajax-content-wrap', function (e) {

			if (e.originalEvent == undefined &&
				$('.slide_out_area_close.non-human-allowed').length == 0 &&
				$('.slide-out-widget-area-toggle.mobile-icon a.non-human-allowed').length == 0) {
				return;
			}

			if ($('.slide-out-widget-area-toggle:not(.std-menu) a.animating').length > 0) {
				return;
			}

			$headerOuterEl.removeClass('no-transition');

			$('.slide-out-widget-area-toggle:not(.std-menu) a')
				.removeClass('open')
				.addClass('closed')
				.attr('aria-expanded', 'false');

			$('.slide-out-widget-area-toggle:not(.std-menu) a')
				.addClass('animating');

			// Slide out from right.
			if ($offCanvasEl.hasClass('slide-out-from-right')) {
				OCM_slideOutRightClose();
			}

			// Fullscreen.
			else if ($offCanvasEl.hasClass('fullscreen')) {
				OCM_fullscreenClose();
			}
			// Fullscreen alt.
			else if ($offCanvasEl.hasClass('fullscreen-alt') || $offCanvasEl.hasClass('fullscreen-split')) {
				OCM_fullscreenAltClose();
			}
			// Simple dropdown.
			else if ($('#header-outer #mobile-menu').length > 0) {
				OCM_simpleDropdownClose();
			}

			if ($('#header-outer #mobile-menu').length == 0) {

				// Dark slide transparent nav
				if ($('#header-outer.temp-removed-dark-slide.transparent').length > 0 && $('#boxed').length == 0) {
					$headerOuterEl
						.removeClass('temp-removed-dark-slide')
						.addClass('dark-slide');
				}

				// Remove header transparent state
				if ($('#header-outer[data-permanent-transparent="1"]').length == 0 && $('#slide-out-widget-area.fullscreen-alt').length == 0) {

					if ($('.nectar-box-roll').length == 0) {
						if ($('#header-outer.small-nav').length > 0 ||
							$('#header-outer.scrolled-down').length > 0) {
							$headerOuterEl.removeClass('transparent');
						}
					}
					else {
						if ($('#header-outer.small-nav').length > 0 ||
							$('#header-outer.scrolled-down').length > 0 ||
							$('.container-wrap.auto-height').length > 0) {
							$headerOuterEl.removeClass('transparent');
						}
					}

				}

				// Remove hidden menu
				$headerOuterEl.removeClass('hidden-menu');

				$headerOuterEl
					.removeClass('side-widget-open')
					.addClass('side-widget-closed');

			} // Not using simple OCM.

			return false;

		});

	}


	/**
	* Off canvas menu main initialization.
	*
	* @since 10.5
	*/
	function OCM_init() {

		if ($('#slide-out-widget-area.slide-out-from-right-hover').length > 0) {
			OCM_slideOutRightHoverInit();
		} else {
			OCM_clickTriggeredStylesInit();
			OCM_simpleStyleInit();
		}


		if ($('#slide-out-widget-area.fullscreen-split').length == 0 &&
			$('body.material[data-slide-out-widget-area-style*="slide-out-from-right"]').length == 0 &&
			$('#slide-out-widget-area[data-dropdown-func="separate-dropdown-parent-link"]').length == 0) {

			fullscreenMenuInit();

		} else if ($('body.using-mobile-browser[data-slide-out-widget-area-style="slide-out-from-right-hover"]').length > 0) {

			// Close OCM on mobile when clicking anchor on same page 
			$('body #slide-out-widget-area .inner .off-canvas-menu-container li a[href]').on('click', function () {

				if ($(this).attr('href') != '#') {
					OCM_close($(this).parent());
				}

			});

		}

		// Page fullscreen row close OCM fullscreen
		if ($('#nectar_fullscreen_rows').length > 0 && $('div[data-slide-out-widget-area-style*="fullscreen"]').length > 0) {

			$('body #slide-out-widget-area .inner .off-canvas-menu-container li a[href]').on('click', function () {
				var $link_href = ($(this).is('[href*="#"]')) ? $(this).attr('href') : '';
				if ($link_href != '#' && $('div[data-fullscreen-anchor-id="' + $link_href.substr($link_href.indexOf("#") + 1) + '"]').length > 0) {

					setTimeout(function () {

						$('#slide-out-widget-area .slide_out_area_close')
							.addClass('non-human-allowed')
							.trigger('click');

					}, 100);

					setTimeout(function () {
						$('#slide-out-widget-area .slide_out_area_close').removeClass('non-human-allowed');
					}, 150);

				}

			});
		}


		// Submenu link hover fix
		$body.on('mouseover', '#slide-out-widget-area .off-canvas-menu-container .menuwrapper > .sub-menu li > a', function () {
			var $currentTxt = $(this).text();
			$('.off-canvas-menu-container .menuwrapper .menu li > a').removeClass('hovered');
			$('.off-canvas-menu-container .menuwrapper .menu li > a:contains(' + $currentTxt + ')').addClass('hovered');
		});

		$body.on('mouseover', '.off-canvas-menu-container .menuwrapper .menu li > a', function () {
			$('.off-canvas-menu-container .menuwrapper .menu li > a').removeClass('hovered');
		});


		// Bind mousewheel.
		// setTimeout(OCM_scrolling, 500);

		// Handle mobile scrolling.
		if (nectarDOMInfo.usingMobileBrowser) {
			$offCanvasEl.addClass('mobile');
		}


	}




	/**
	* Off canvas menu scrolling.
	*
	* @since 10.5
	*/
	function OCM_scrolling() {

		$offCanvasEl.mousewheel(function (event, delta) {

			this.scrollTop -= (delta * 30);

			event.preventDefault();
		});

	}


	function clickToggleSubmenus() {

		if (!$('#header-outer[data-format="left-header"]').length > 0 &&
			!$('body.material[data-slide-out-widget-area-style*="slide-out-from-right"]').length > 0 &&
			!$('#slide-out-widget-area.fullscreen-split').length > 0 &&
			!$('#slide-out-widget-area[data-dropdown-func="separate-dropdown-parent-link"]').length > 0) {
			return;
		}

		// Remove megamenu class.
		$('#header-outer[data-format="left-header"] nav li.megamenu').removeClass('megamenu');

		var $ocm_link_selector;

		if ($('#slide-out-widget-area[data-dropdown-func="separate-dropdown-parent-link"]').length > 0) {
			$ocm_link_selector = '#slide-out-widget-area .off-canvas-menu-container li.menu-item-has-children > .ocm-dropdown-arrow';
		} else {
			$ocm_link_selector = 'body.material #slide-out-widget-area[class*="slide-out-from-right"] .off-canvas-menu-container li.menu-item-has-children > a, #slide-out-widget-area.fullscreen-split .off-canvas-menu-container li.menu-item-has-children > a';
		}

		// Click event.
		$('#header-outer[data-format="left-header"] nav li.menu-item-has-children > a, ' + $ocm_link_selector).on('click', function () {

			if ($(this).parent().hasClass('open-submenu')) {
				$(this).parent().find('.sub-menu').css({
					'max-height': '0'
				});
				$(this).parent().removeClass('open-submenu');
			} else {

				// Get max height.
				var $that = $(this);
				var $maxSubMenuHeight;

				$that.parent()
					.find('> .sub-menu')
					.addClass('no-trans');

				setTimeout(function () {

					$that.parent().find('> .sub-menu').css({
						'max-height': 'none',
						'position': 'absolute',
						'visibility': 'hidden'
					});

					$maxSubMenuHeight = $that.parent().find('> .sub-menu').height();

					$that.parent()
						.find('> .sub-menu')
						.removeClass('no-trans');

					$that.parent().find('> .sub-menu').css({
						'max-height': '0',
						'position': 'relative',
						'visibility': 'visible'
					});

				}, 25);

				setTimeout(function () {

					// Reset Max Height.
					$that.closest('ul')
						.find('li.menu-item-has-children')
						.removeClass('open-submenu');

					$that.closest('ul').find('li.menu-item-has-children > .sub-menu').css({
						'max-height': '0'
					});

					$that.parent().addClass('open-submenu');

					$that.parent()
						.find('> .sub-menu')
						.css('max-height', $maxSubMenuHeight);

					// Add height to open parents.
					if ($that.parents('ul').length > 0) {

						$that.parents('ul:not(.sf-menu)').each(function () {
							$(this).css('max-height');
							$(this).css('max-height', parseInt($(this).height() + parseInt($(this).css('padding-top')) * 2 + $maxSubMenuHeight) + 'px');
						});
					}


				}, 50);
			}

			return false;

		});

		// Start open for current page items.	
		if ($('#header-outer[data-format="left-header"] nav .sf-menu > .current-menu-ancestor.menu-item-has-children > ul > li.current-menu-item').length > 0) {
			$('#header-outer[data-format="left-header"] nav .sf-menu > .current-menu-ancestor.menu-item-has-children > a').trigger('click');
		}


	}








	/**
	* DLMenu - plugin used for submenus in off canvas menu.
	*
	* @since 6.0
	*/
	$.DLMenu = function (options, element) {
		this.$el = $(element);
		this._init(options);
	};

	// the options
	$.DLMenu.defaults = {
		// classes for the animation effects
		animationClasses: {
			classin: 'dl-animate-in-1',
			classout: 'dl-animate-out-1'
		},
		onLevelClick: function () {
			return false;
		},
		onLinkClick: function () {
			return false;
		}
	};




	/**
	* Set the page header height when using "slide down" theme option effect.
	*
	* @since 2.0
	*/
	function pageHeaderSlideInHeight() {

		var pageHeaderHeight = parseInt($pageHeaderBG.height());
		$('div[data-aie="slide-down"] #page-header-wrap:not(.fullscreen-header):not([data-responsive="true"])').css('height', pageHeaderHeight + 'px');

	}



	/**
	* Page header initialization.
	*
	* @since 2.0
	*/
	function pageHeaderInit() {

		var $headerRemoveStickyness = ($('div[data-hhun="1"]').length > 0 && $('#header-outer[data-remove-fixed="1"]').length > 0) ? 1 : 0;

		if ($('#page-header-bg[data-parallax="1"]').length > 0) {

			// Fade in
			var img = new Image(),
				pageHeaderHeight = parseInt($pageHeaderBG.height()),
				$initialImgCheck = extractUrl($('#page-header-bg[data-parallax="1"]').css('background-image'));

			if ($initialImgCheck && $initialImgCheck.indexOf('.') !== -1) {
				img.onload = function () {
					pageHeaderAfterLoad();
				};

				img.src = extractUrl($('#page-header-bg[data-parallax="1"]').css('background-image'));

			} else {
				pageHeaderAfterLoad();
			}


			if ($('div[data-hhun="1"]').length > 0 && !$('#header-outer[data-remove-fixed="1"]').length > 0) {
				$headerOuterEl.addClass('parallax-contained');
			}

			// Calculate on scroll.
			window.addEventListener('scroll', function () {
				if (nectarDOMInfo.winW > 1000) {
					window.requestAnimationFrame(parallaxPageHeaderCalc);
				}
			}, false);

		}

		var $pt_timeout = ($('div[data-ajax-transitions="true"]').length > 0 && $('#page-header-bg[data-animate-in-effect="slide-down"]').length > 0) ? 350 : 0;

		if ($pageHeaderBG.length > 0) {

			// Slide in height effect.
			setTimeout(function () {
				pageHeaderSlideInHeight();
			}, $pt_timeout);

			$('#page-header-bg[data-animate-in-effect="fade-in"]').addClass('loaded');

			// Using bg classname.
			var $initialImgCheckAscend = extractUrl($pageHeaderBG.css('background-image'));
			if ($initialImgCheckAscend && $initialImgCheckAscend.indexOf('.') !== -1) {
				$pageHeaderBG.addClass('has-bg');
			}

			// Resize slide in height.
			$window.on('smartresize', pageHeaderSlideInHeight);

		}



		if ($pageHeaderBG.length > 0) {

			// Bind unload event
			pageHeaderUnload();

			// Initialize text effects.
			if ($('.nectar-box-roll').length == 0) {
				pageHeaderTextEffectInit();
			}

		}

	}










	/**
	* Page header text effect animation.
	*
	* @since 6.0
	*/
	function pageHeaderTextEffect() {

		if ($('#page-header-bg .nectar-particles').length == 0 && $('#page-header-bg[data-text-effect="none"]').length == 0 ||
			$('.nectar-box-roll').length > 0 && $('#page-header-bg .nectar-particles').length == 0) {

			var $selector = ($('.nectar-box-roll').length == 0) ? '#page-header-bg .span_6' : '.nectar-box-roll .overlaid-content .span_6';

			$($selector).find('.wraped').each(function (i) {
				$(this).find('span').delay(i * 370).transition({
					rotateX: '0',
					'opacity': 1,
					y: 0
				}, 400, 'easeOutQuad');
			});

			setTimeout(function () {

				$($selector).find('.inner-wrap > *:not(.top-heading)').each(function (i) {
					$(this).delay(i * 370).transition({
						rotateX: '0',
						'opacity': 1,
						y: 0
					}, 650, 'easeOutQuad');
				});

				$('.scroll-down-wrap, .scroll-down-wrap .section-down-arrow').removeClass('hidden');

			}, $($selector).find('.wraped').length * 370);
		}

	}


	/**
	* Page header text effect initialization.
	*
	* @since 6.0
	*/
	function pageHeaderTextEffectInit() {

		pageHeaderTextEffectMarkup();

		var $effectTimeout = ($loadingScreenEl.length > 0) ? 800 : 0;

		if ($('#page-header-bg .nectar-video-wrap video').length == 0) {
			setTimeout(pageHeaderTextEffect, $effectTimeout);
		}

	}


	function waypoints() {

	}


	function headerSpace() {

		if ($('.mobile').length > 0) {

			if (nectarDOMInfo.winH < nectarDOMInfo.winW && nectarDOMInfo.winW > 1000) {
				if ($('#header-outer.small-nav').length == 0) {
					$('#header-space').css('height', $headerOuterEl.outerHeight());
				}
			} else {
				$('#header-space').css('height', $headerOuterEl.outerHeight());
			}

		} else {

			if ($('.nectar-parallax-scene.first-section').length == 0) {

				var headerPadding2 = headerPadding - headerPadding / 1.8;
				var $headerHeight = ($('#header-outer[data-header-resize="1"]').length > 0 && $('.small-nav').length > 0) ? $headerOuterEl.outerHeight() + (parseInt(logoShrinkNum) + headerPadding2 * 2) : $headerOuterEl.outerHeight();

				$('#header-space').css('height', $headerHeight);

			}

		}

	}



	function pageLoadHash() {

		var $hash = window.location.hash;

		if ($hash && $hash.length > 0) {
			$hash = $hash.replace(/<|>/g, '');
		}

		var $hashSubstrng = ($hash && $hash.length > 0) ? $hash.substring(1, $hash.length) : 0,
			headerPadding2 = parseInt($headerOuterEl.attr('data-padding')) * 2,
			$hasSlashLength = 0;

		// If the hash has slashes 
		if ($hashSubstrng) {
			$hasSlashLength = $hashSubstrng.split("/");
			$hasSlashLength = $hasSlashLength.length;
		}

		if ($hashSubstrng && $hasSlashLength > 1) {
			$hashSubstrng = $hashSubstrng.replace(/\//g, "");
			$hash = $hash.replace(/\//g, "");
		}

		if ($hash && $('.main-content').find($hash).length > 0 ||
			$hash && $('.main-content').find('[data-fullscreen-anchor-id="' + $hashSubstrng + '"]').length > 0) {

			var $hashObj = ($('.main-content').find($hash).length > 0) ? $('.main-content').find($hash) : $('.main-content').find('[data-fullscreen-anchor-id="' + $hashSubstrng + '"]'),
				$headerNavSpace = ($('div[data-header-format="left-header"]').length > 0 && $window.width() > 1000) ? 0 : $('#header-space').outerHeight();

			if ($('.page-template-template-no-header-footer').length > 0 || $('.page-template-template-no-header').length > 0) {
				$headerNavSpace = 0;
			}

			var $timeoutVar = 0;

			if ($('.nectar-box-roll').length > 0 && $('.container-wrap.bottomBoxOut').length > 0) {
				nectarBoxRoll.boxRoll(null, -1);
				$timeoutVar = 2050;
			}


		}
	}


	/**
	* Initialize page load hash functionality
	*
	* @since 10.5
	*/
	function pageLoadHashInit() {

		if ($('div[data-animated-anchors="true"]').length > 0) {
			if ($('.nectar-box-roll').length == 0 && $('#nectar_fullscreen_rows').length == 0) {

				// Inside tabs
				if (typeof nectarGetQueryParam['tab'] != 'undefined') {
					setTimeout(function () {
						pageLoadHash();
					}, 800);
				}
				// Regular
				else {
					pageLoadHash();
				}

			}

			if ($('#nectar_fullscreen_rows[data-mobile-disable="on"]').length > 0 && $('.nectar-box-roll').length == 0 &&
				nectarDOMInfo.usingMobileBrowser) {
				pageLoadHash();
			}

		}

	}



	// Document ready event - starting everything up.
	jQuery(document).ready(function ($) {



		initSF();



		mobileNavMegamenuCorrect();
		materialSkinOCM_Init();
		OCM_dropdownMarkup();
		OCM_dropdownIconPos();
		clickToggleSubmenus();


		OCM_init();


		pageHeaderInit();





		// Main Debounced Resize Event.
		$window.off('smartresize.srInit');
		$window.on('smartresize.srInit', smartResizeInit);

		// Main Resize Event.
		$window.off('resize.srInit');
		$window.on('resize.srInit', resizeInit);

		// Window Load Event.
		$window.on('load', function () {

			// Set header space.
			if ($(window).scrollTop() == 0) {
				headerSpace();
			}




			pageLoadHashInit();



		});


	});



}(window.jQuery, window, document));
