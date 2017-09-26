import { View } from '../../lib/View';
import Scroll from '../../lib/Scroll';
import { TweenLite } from 'gsap';
import Carousel from '../components/Carousel';

const AboutPage = View.extend({

	components: {

		carousel: {selector: '.js-carousel', type: Carousel},

	},

	onInitialized: function () {
		var e = this.el, top = 0;
		while(e = e.offsetParent) {top += e.offsetTop;}

		if (window.scrollY < top) {
			Scroll.scrollToElement(this.el, 0.5);
		}
	},

	transitionIn() {
		TweenLite.fromTo(this.el, 1, {opacity: 0}, {opacity: 1})
	},

	transitionOut(callback) {
		TweenLite.to(this.el, 1, {opacity: 0, onComplete: callback})
	}
})

export default AboutPage;