import { View } from '../../lib/View';
import { TweenLite } from 'gsap';
import Carousel from '../components/Carousel';
import ParallaxPoster from '../components/ParallaxPoster';

const NTSCPage = View.extend({

	components: {

		carousel: {selector: '.js-carousel', type: Carousel},
		parallaxPoster: {selector: '.js-parallax-poster', type: ParallaxPoster}

	},

	onInitialized: function () {
		
	},

	transitionIn() {
		TweenLite.fromTo(this.el, 1, {opacity: 0}, {opacity: 1})
	},

	transitionOut(callback) {
		TweenLite.to(this.el, 1, {opacity: 0, onComplete: callback})
	}
})

export default NTSCPage;