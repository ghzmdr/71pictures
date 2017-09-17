import { View } from '../../lib/View';
import { TweenLite } from 'gsap';
import Carousel from '../components/Carousel';

const CompanyPage = View.extend({

	components: {

		carousel: {selector: '.js-carousel', type: Carousel},

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

export default CompanyPage;