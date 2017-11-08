/*
Adds support for google adsense to any page without having messy code in your HTML
Author: TC McCarthy
Instructions:

Copy just the ins tags from your google adsense dashboard for the ad units you want to use and place them on your page where you want them to appear. This class will handle the rest.

*/

var adsbygoogle,
	tAds = {
		libLoaded: false, //don't touch this. It's set to false on load so the browser knows to AJAX in the adsbygoogle.js library. After first load this is set to true.
		logging: true, //you may want to set this to false when going to production. This just gives you development cues.
		in_page: "ca-pub-2243841471703944", //set to false for no in_page ads. Put a your in_page google_ad_client as the value if you want in_page ads
		init: function () {
			var _this = this;
			$(_this.onReady.bind(_this));
			$(window).on("scroll", function () {
				clearTimeout(_this.lazyLoadTimer);

				_this.lazyLoadTimer = setTimeout(function () {
					_this.lazyLoad();
				}, 250);
			});

			//asyncronously load adsbygoogle.js once
			this.loadLibrary(function () {
				if (_this.in_page !== true && _this.in_page !== false) {
					_this.log("Enabling in page ads");
					(adsbygoogle = window.adsbygoogle || []).push({
						google_ad_client: _this.in_page,
						enable_page_level_ads: true
					});

					_this.in_page = true;
				}
				_this.log("Ad library loaded");
			});
		},

		onReady: function () { //wait for DOM ready
			var _this = this;
			this.lazyPrep(); //get the lazy load stuff ready
			this.loadAds();
		},

		loadAds: function () {
			var _this = this;
			_this.log("Load Ads");

			$("ins.adsbygoogle:not([data-adsbygoogle-status])").each(function () {
				(adsbygoogle = window.adsbygoogle || []).push({});
			});
		},

		lazyPrep: function () {
			$(".ad.lazy").each(function () {
				var ele = $(this),
					adHTML = ele.html();

				ele.data("html", adHTML);
			});
		},

		lazyLoad: function () {
			var _this = this;
			$(".ad.lazy:not(.done)").each(function () {
				var ele = $(this);

				if (_this.isInView(ele)) {
					ele.append(ele.data("html"));
					ele.addClass("done");
				}

				_this.loadAds();
			});
		},

		loadLibrary: function (cb) {
			var _this = this;
			_this.log("Loading ad library");
			$.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function () {
				_this.libLoaded = true;
				if (typeof cb === "function") {
					cb();
				}
			});
		},

		//wrapper for console logs so you can easily turn them off
		log: function (x) {
			var _this = this;

			if (_this.logging) {
				console.log(x);
			}
		},

		isInView: function (el) {
			if (typeof el == "undefined") {
				return false;
			}

			if (typeof el === "object") {
				el = el[0];
			}

			var rect = el.getBoundingClientRect();

			return rect.bottom > 0 &&
				rect.right > 0 &&
				rect.left < (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */ &&
				rect.top < (window.innerHeight || document.documentElement.clientHeight) /*or $(window).height() */ ;
		}
	};

tAds.init();
