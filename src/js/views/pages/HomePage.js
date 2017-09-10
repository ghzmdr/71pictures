import { View } from '../../lib/View';
import { TweenLite } from 'gsap';
import Scroll from '../../lib/Scroll';
import Size from '../../lib/Size';
import BackgroundVideo from '../../components/BackgroundVideo';
import NTSCPage from '../../views/pages/NTSCPage';

const HomePage = View.extend({

	ui: {
		logo: '.js-home-logo',
		peek: '.js-home-peek'
	},

	components: {

		backgroundVideo: {selector: '.js-home-video', type: BackgroundVideo},

		ntscPage: {selector: '.js-page-ntsc', type: NTSCPage}

	},

	_initialize: function (options) {

		if (options.scrollToNTSC) {
			this._scrollToNTSC = true
		}

		this.listenTo(Scroll, 'scroll', this._scrollHandler);	
	},

	_onInitialized: function () {
		this._createLogoTimeline();	
		this._scrollHandler();
	},

	transitionIn: function () {
		TweenLite.to(this.ui.logo, 0.7, {opacity: 1}, 0.2);
	},

	_createLogoTimeline: function () {
		this._logoTimeline = new TimelineLite({paused: true});
		this._logoTimeline.to(this.ui.logo, 0.5, {color: 'black'}, 0.5);
	},

	_scrollHandler: function () {

		var progress = Math.min(Math.max(Scroll.scrollY() / Size.innerHeight(), 0), 1);

		this.components.backgroundVideo.progress(progress);
		this._logoTimeline.progress(progress);
		
	}
})

export default HomePage;