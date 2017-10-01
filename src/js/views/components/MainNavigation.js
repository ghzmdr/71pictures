import { View } from '../../lib/View';
import Size from '../../lib/Size';
import Scroll from '../../lib/Scroll';
import { offsetTop } from '../../utils/DOM';

const MainNavigation = View.extend({

	events: {
		'click a[href="/"]': '_homeClickHandler', //TODO: temp!
		'click a[href="/ntsc"]': '_ntscClickHandler' //TODO: temp!
	},

	onInitialized: function () {
		this._setListeners();
		this._computeTop();
		this._scrollHandler();
	},

	_setListeners: function() {
		this.listenTo(Scroll, 'scroll', this._scrollHandler);
		this.listenTo(Size, 'resize', this._resizeHandler);
	},

	_toggle: function () {
		this.el.classList[this._isFixed ? 'remove' : 'add']('is-fixed');
		this._isFixed = !this._isFixed;
	},

	_scrollHandler: function() {
		if (Scroll.Y > this._originalTop) {
			if (this._isFixed) return;
			this._toggle();
		} else {
			if (!this._isFixed) return;
			this._toggle();
		}
	},

	_computeTop: function () {
		this._originalTop = Size.innerHeight() - this.el.clientHeight;
	},

	_resizeHandler: function () {
		this._computeTop();
	},

	_homeClickHandler: function () {
		Scroll.scrollTo(0);
		console.log('asd')
	},

	_ntscClickHandler: function() {
		Scroll.scrollToElement(document.querySelector('.js-page'));
	}


})


export default MainNavigation;