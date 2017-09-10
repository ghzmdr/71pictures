import { View } from '../../lib/View';
import { TweenLite } from 'gsap';
import Carousel from '../../components/Carousel';

const NTSCPage = View.extend({

	components: {

		carousel: {selector: '.js-ntsc-carousel', type: Carousel},

	},

	_onInitialized: function () {
	}
})

export default NTSCPage;