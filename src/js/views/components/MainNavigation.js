import { View } from '../../lib/View';
import Size from '../../lib/Size';
import {TimelineLite} from 'gsap';
import Scroll from '../../lib/Scroll';
import { offsetTop } from '../../utils/DOM';

const MainNavigation = View.extend({
	
	onInitialized: function () {
		this._setListeners();
		this._scrollHandler();
	},

	_setListeners: function() {
		this.listenTo(Scroll, 'scroll', this._scrollHandler);
		this.listenTo(Size, 'resize', this._resizeHandler);
	},

	_scrollHandler: function() {

		if (Scroll.Y > Size.innerHeight() * 0.85) {
			this._showBackground();
		} else {
			this._hideBackground();
		}

	},

	_showBackground: function() {
		console.log('show')
		if (this._isBgShown) return;
		this._isBgShown = true;

		this._obtainTimeline().play();
	},

	_hideBackground: function() {
		if (!this._isBgShown) return;
		this._isBgShown = false;

		this._obtainTimeline().reverse();
	},

	_obtainTimeline: function() {
		if (this._timeline) return this._timeline;

		var tl = new TimelineLite();
		tl.to('.main-navigation__background', 0.4, {y: 0, ease: Power3.easeIn}, 0);

		return this._timeline = tl;
	},

	_resizeHandler: function() {
		this._scrollHandler();
	}

})


export default MainNavigation;