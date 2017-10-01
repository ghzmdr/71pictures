import { View } from '../../lib/View';
import { bindAll } from 'underscore';
import { TweenLite, TimelineLite } from 'gsap';
import Size from '../../lib/Size';
import Scroll from '../../lib/Scroll';
import Background from './Background';

const Cover = View.extend({

	ui: {
		logo: '.js-logo',
		image: '.js-image',
		logoLetters: '.js-logo-letter',
		logoPieces: '.js-logo-piece'
	},

	components: {
		background: {selector: '.js-background', type: Background},
	},

	onInitialized: function () {
		this.transitionIn();

		this._createParallaxTimeline();	
		this.listenTo(Scroll, 'scroll', this._scrollHandler);	
		this.listenTo(Size, 'resize', this._resizeHandler);	
		this._setProgressFromScroll();
	},

	transitionIn: function () {
		TweenLite.to(this.ui.logo, 0.7, {opacity: 1});
		
		this.ui.logoPieces.forEach((piece, index) => {
			var delay = (index + 1) * 0.2;
			TweenLite.to(piece, 0.25, {opacity: 1, delay})
		})
		
		var hasPlayed = false;
		var lettersTl = new TimelineLite();

		this.ui.logoLetters.forEach((letter, index) => {
			var delay = 0.6 + (0.8 * (index / (this.ui.logoLetters.length-1)));
			lettersTl.to(letter, 0.25, {opacity: 1}, delay);
		})
	},

	_createParallaxTimeline: function () {
		if (this._parallaxTimeline) this._killParallaxTimeline();
		this._parallaxTimeline = new TimelineLite({paused: true});
		this._parallaxTimeline.fromTo(this.ui.logo, 1, {y: 0}, {y: Size.innerHeight(0) * -0.2}, 0);
		this._parallaxTimeline.fromTo(this.ui.logo, 0.6, {opacity: 1}, {opacity: 0}, 0.3);
		this._parallaxTimeline.fromTo(this.ui.image, 1, {y: 0}, {y: Size.innerHeight() * -0.1}, 0);
	},

	_setProgressFromScroll: function () {

		var progress = Math.min(Math.max(Scroll.Y / Size.innerHeight(), 0), 1);
		this._parallaxTimeline.progress(progress);

	},

	_killParallaxTimeline: function () {
		this._parallaxTimeline.stop();
		this._parallaxTimeline.kill();
		this._parallaxTimeline = null;	
	},

	_resizeHandler: function () {
		this._createParallaxTimeline();
		this._setProgressFromScroll();	
	},

	_scrollHandler: function (e) {
		this._setProgressFromScroll();
	}
})

export default Cover;