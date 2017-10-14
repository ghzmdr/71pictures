import { View } from '../../lib/View';
import Size from '../../lib/Size';
import Scroll from '../../lib/Scroll';
import { offsetTop } from '../../utils/DOM';

const StickyElement = View.extend({
	initialize: function(options) {
		this._triggerTopOffset = options.triggerTopOffset || 0; //in percentages of element height
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
		if (Scroll.Y > this._triggerTop) {
			if (this._isFixed) return;
			this._toggle();
		} else {
			if (!this._isFixed) return;
			this._toggle();
		}
	},

	_computeTop: function () {
		this._triggerTop = offsetTop(this.el) + this._triggerTopOffset * this.el.clientHeight;
	},

	_resizeHandler: function () {
		this._computeTop();
	}

})


export default StickyElement;