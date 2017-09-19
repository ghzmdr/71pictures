import { View } from '../../lib/View';
import ParallaxItem from '../../utils/ParallaxItem';
import ParallaxContainer from '../../utils/ParallaxContainer';

export default View.extend({

	ui: {
		container: '.js-parallax-poster-container',
		items: '.js-parallax-poster-item',
	},

	onInitialized: function() {
		this._parallaxContainer = new ParallaxContainer(this.ui.container[0]);

		this.ui.items.each((index, item) => this._parallaxContainer.add(
			`layer_${index}`,
			new ParallaxItem(item, {depth: item.dataset.depth || 1})
		));
	}

});