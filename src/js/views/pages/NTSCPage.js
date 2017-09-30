import { View } from '../../lib/View';
import ScrollAwareUI from '../../helpers/ScrollAwareUI';
import Scroll from '../../lib/Scroll';
import Size from '../../lib/Size';
import { TweenLite } from 'gsap';
import Carousel from '../components/Carousel';
import ParallaxPoster from '../components/ParallaxPoster';

const NTSCPage = View.extend({

	ui: {
		title: '.js-page-title',
		titleContent: '.js-title-content',
		intro: '.js-ntsc-intro',
		poster: '.js-parallax-poster'
	},

	components: {

		carousel: {selector: '.js-carousel', type: Carousel},
		parallaxPoster: {selector: '.js-parallax-poster', type: ParallaxPoster}

	},	

	initialize: function (options) {
		Object.assign(this, ScrollAwareUI);
		this.initScrollUI();

		this._scrollToPage = options.scrollToPage;
	},

	onInitialized: function () {
		if (this._scrollToPage) {
			var top = this._offsetTop(this.el);

			if (window.scrollY < top) {
				Scroll.scrollToElement(this.el, 0.5);
			}
		}
	},

	titleVisible: function () {
		TweenLite.fromTo(this.ui.titleContent, 0.6, {x: '70%'}, {x: '0%', delay: 0.1, ease: Power3.easeOut});
		TweenLite.to(this.ui.title, 0.6, {opacity: 1, delay: 0.2});
		TweenLite.from(this.ui.title, 0.6, {y: '30%', delay: 0.15, ease: Circ.easeOut});

	},

	introVisible: function () {
		TweenLite.to(this.ui.intro, 0.8, {opacity: 1, delay: 0.2});
	},

	posterVisible: function () {
		TweenLite.to(this.ui.poster, 1, {opacity: 1, delay: 0.3});
		TweenLite.from(this.ui.poster, 1, {y: '30%', delay: 0.25, ease: Circ.easeOut});
	},

	transitionIn() {
		TweenLite.fromTo(this.el, 1, {opacity: 0}, {opacity: 1})
	},

	transitionOut(callback) {
		TweenLite.to(this.el, 1, {opacity: 0, onComplete: callback})
	}
})

export default NTSCPage;