import { View, initializeComponents } from '../../lib/View';
import ScrollAwareView from '../../helpers/ScrollAwareView';
import Size from '../../lib/Size';
import { offsetTop } from '../../utils/DOM';
import { TweenLite } from 'gsap';

import Project from '../articles/Project';
import Blog from '../articles/Blog';

const AboutPage = View.extend({

	ui: {
		title: '.js-page-title',
		subtitle: '.js-page-subtitle',
		carousel: '.js-carousel'
	},

	components: {
		project: {selector: '.js-project-article', type: Project},
		blog: {selector: '.js-blog-article', type: Blog}
	},

	initialize: function (options) {
		Object.assign(this, ScrollAwareView);
		this.initScrollUI();
	},

	titleVisible: function () {
		TweenLite.to(this.ui.title, 0.6, {opacity: 1, delay: 0.2});
		TweenLite.from(this.ui.title, 0.6, {y: '20%', delay: 0.1, ease: Circ.easeOut});	
		TweenLite.to(this.ui.subtitle, 0.8, {opacity: 1, delay: 0.8});
	},

	transitionIn() {
		TweenLite.fromTo(this.el.children, 0.3, {opacity: 0}, {opacity: 1})
	},

	transitionOut(callback) {
		TweenLite.to(this.el.children, 0.3, {opacity: 0, onComplete: callback})
	}
})

export default AboutPage;