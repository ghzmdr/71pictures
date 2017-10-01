import { View } from '../../lib/View';
import ScrollAwareView from '../../helpers/ScrollAwareView';
import Scroll from '../../lib/Scroll';
import Size from '../../lib/Size';
import { offsetTop } from '../../utils/DOM';
import { TweenLite } from 'gsap';
import Carousel from '../components/Carousel';
import ParallaxPoster from '../components/ParallaxPoster';

const NTSCPage = View.extend({

	ui: {
		title: '.js-page-title',
		subtitle: '.js-page-subtitle',
		titleContent: '.js-title-content',
		intro: '.js-ntsc-intro',
		poster: '.js-parallax-poster',
		carousel: '.js-carousel'
	},

	components: {

		carousel: {selector: '.js-carousel', type: Carousel},
		parallaxPoster: {selector: '.js-parallax-poster', type: ParallaxPoster}

	},	

	initialize: function (options) {
		Object.assign(this, ScrollAwareView);
		this.initScrollUI();

		this.listenToOnce(this, 'initialized', () => this._scrollToSection(options.scrollToSection));
	},

	onInitialized: function () {
		if (this._scrollToPage) {
			var top = this._offsetTop(this.el);

			if (window.scrollY < top) {
				Scroll.scrollToElement(this.el, 0.5);
			}
		}
	},

	updateData: function(options) {
		this._scrollToSection(options.scrollToSection);
	},

	_scrollToSection: function (section) {
		Scroll.scrollToElement(document.querySelector(section));
	},

	titleVisible: function () {
		TweenLite.to(this.ui.title, 0.6, {opacity: 1, delay: 0.2});
		TweenLite.from(this.ui.title, 0.6, {y: '20%', delay: 0.15, ease: Circ.easeOut});
		TweenLite.to(this.ui.subtitle, 0.8, {opacity: 1, delay: 0.8});
	},

	introVisible: function () {
		var delay = 0.8;
		Array.from(this.ui.intro.children).forEach((item, index) => {
			delay += index * 0.2;
			TweenLite.to(item, 0.8, {opacity: 1, delay});
		})
	},

	posterVisible: function () {
		TweenLite.to(this.ui.poster, 1, {opacity: 1, delay: 0.3});
		TweenLite.from(this.ui.poster, 1, {y: '30%', delay: 0.25, ease: Circ.easeOut});
	},

	carouselVisible: function(carousel) {
		TweenLite.to(carousel, 0.8, {opacity: 1, delay: 0.3});
	},

	transitionIn() {
		TweenLite.fromTo(this.el, 1, {opacity: 0}, {opacity: 1})
	},

	transitionOut(callback) {
		TweenLite.to(this.el, 1, {opacity: 0, onComplete: callback})
	}
})

export default NTSCPage;