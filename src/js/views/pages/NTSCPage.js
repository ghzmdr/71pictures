import { View } from '../../lib/View';
import { TweenLite } from 'gsap';
import Carousel from '../components/Carousel';

const NTSCPage = View.extend({

	components: {

		carousel: {selector: '.js-carousel', type: Carousel},

	},

	onInitialized: function () {
		
	}
})

export default NTSCPage;