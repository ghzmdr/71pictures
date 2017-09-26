import { View } from '../../lib/View';
import Scroll from '../../lib/Scroll';
import { TweenLite } from 'gsap';
import Carousel from '../components/Carousel';
import ParallaxPoster from '../components/ParallaxPoster';

const NTSCPage = View.extend({

	components: {

		carousel: {selector: '.js-carousel', type: Carousel},
		parallaxPoster: {selector: '.js-parallax-poster', type: ParallaxPoster}

	},

	initialize: function (options) {
		this._scrollToPage = options.scrollToPage;	
	},

	onInitialized: function () {
		if (this._scrollToPage) {
			var e = this.el, top = 0;
			while(e = e.offsetParent) {top += e.offsetTop;}

			if (window.scrollY < top) {
				Scroll.scrollToElement(this.el, 0.5);
			}
		}
	},

	transitionIn() {
		TweenLite.fromTo(this.el, 1, {opacity: 0}, {opacity: 1})
	},

	transitionOut(callback) {
		TweenLite.to(this.el, 1, {opacity: 0, onComplete: callback})
	}
})

export default NTSCPage;