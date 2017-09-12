import { View } from '../lib/View';
import { bindAll } from 'underscore';
import { TweenLite } from 'gsap';
import Scroll from '../lib/Scroll';
import Size from '../lib/Size';

const Intro = View.extend({

	ui: {
		logo: '.js-logo'
	},

	_initialize: function (options) {
		bindAll(this, '_scrollHandler');
	},

	_onInitialized: function () {

		this._createLogoTimeline();	
		this.listenTo(Scroll, 'scroll', this._scrollHandler);	

	},

	transitionIn: function () {
		TweenLite.to(this.ui.logo, 0.7, {opacity: 1});
	},

	_createLogoTimeline: function () {
		this._logoTimeline = new TimelineLite({paused: true});
		this._logoTimeline.to(this.ui.logo, 0.5, {color: 'black'}, 0.5);
	},

	_scrollHandler: function (e) {

		var progress = Math.min(Math.max(e.viewports, 0), 1);
		this._logoTimeline.progress(progress);
		
	}
})

export default Intro;