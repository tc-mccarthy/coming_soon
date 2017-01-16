var app = {
	ele: {},
	template: {},
	init: function () {
		var _this = this;
		$(_this.onReady.bind(_this));
		$(window).scroll(_this.onScroll.bind(_this));
		$(window).resize(_this.onResize.bind(_this));
		$(window).load(_this.onLoad.bind(_this));
		_this.ajaxScripts();
	},

	onReady: function () {
		var _this = this;
	},

	onLoad: function () {
		var _this = this;
	},

	onScroll: function () {
		var _this = this;
	},

	onResize: function () {
		var _this = this;
	},

	binds: function () {
		var _this = this;
	},

	ajaxScripts: function () {
		//google analytics
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function () {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

		ga('create', 'UA-74948704-1', 'auto');
		ga('send', 'pageview');


		//hotjar
		(function (h, o, t, j, a, r) {
			h.hj = h.hj || function () {
				(h.hj.q = h.hj.q || []).push(arguments)
			};
			h._hjSettings = {
				hjid: 229696,
				hjsv: 5
			};
			a = o.getElementsByTagName('head')[0];
			r = o.createElement('script');
			r.async = 1;
			r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
			a.appendChild(r);
		})(window, document, '//static.hotjar.com/c/hotjar-', '.js?sv=');
	}
};

app.init();
