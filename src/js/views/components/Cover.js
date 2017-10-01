import { View } from '../../lib/View';
import { bindAll } from 'underscore';
import { TweenLite } from 'gsap';
import Scroll from '../../lib/Scroll';
import Size from '../../lib/Size';
import Background from './Background';

const Cover = View.extend({

	ui: {
		logo: '.js-logo'
	},

	components: {
		background: {selector: '.js-background', type: Background},
	},

	initialize: function (options) {
		bindAll(this, '_scrollHandler');
	},

	onInitialized: function () {

		this._createLogoTimeline();	
		this.listenTo(Scroll, 'scroll', this._scrollHandler);	
		this._setProgressFromScroll();
	},

	transitionIn: function () {
		TweenLite.to(this.ui.logo, 0.7, {opacity: 1});
	},

	_createLogoTimeline: function () {
		this._logoTimeline = new TimelineLite({paused: true});
		this._logoTimeline.to(this.ui.logo, 0.5, {color: 'black'}, 0.5);
	},

	_setProgressFromScroll: function () {

		var progress = Math.min(Math.max(Scroll.Y / Size.innerHeight(), 0), 1);
		this._logoTimeline.progress(progress);

	},

	_scrollHandler: function (e) {
		this._setProgressFromScroll();
	}
})

export default Cover;