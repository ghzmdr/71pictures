import { View } from '../../lib/View';
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
	}

});