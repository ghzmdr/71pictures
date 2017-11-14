import { View } from '../../lib/View';
import Size from '../../lib/Size';
import ParallaxContainer from '../../helpers/ParallaxContainer';

export default View.extend({

	ui: {
		container: '.js-parallax-poster-container',
		items: '.js-parallax-poster-item',
	},

	onInitialized: function() {
		this._parallaxContainer = new ParallaxContainer(this.ui.container);

		this.ui.items.forEach((el,index) => this._parallaxContainer.add(
			`layer_${index}`,
			{el, depth: el.dataset.depth || 1})
		);

		this._setListeners();
		this._checkEnabledBreakpoint();
	},

	_checkEnabledBreakpoint: function () {
		if (Size.innerWidth() >= 1280) {
			this._parallaxContainer.enable();
		} else {
			this._parallaxContainer.disable();
		}
	},

	_setListeners: function () {
		this.listenTo(Size, 'resize', this._resizeHandler)
	},

	_resizeHandler: function () {
		this._checkEnabledBreakpoint();
	}

});